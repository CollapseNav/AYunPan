using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FileInfo",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 40, nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    DeleteDate = table.Column<DateTime>(nullable: true),
                    ChangedBy = table.Column<string>(maxLength: 40, nullable: true),
                    IsDeleted = table.Column<int>(nullable: false),
                    FileName = table.Column<string>(maxLength: 248, nullable: false),
                    FilePath = table.Column<string>(maxLength: 1024, nullable: false),
                    FileType = table.Column<string>(maxLength: 10, nullable: false),
                    FileSize = table.Column<string>(maxLength: 20, nullable: false),
                    MapPath = table.Column<string>(maxLength: 1024, nullable: false),
                    OwnerId = table.Column<string>(maxLength: 40, nullable: false),
                    OwnerName = table.Column<string>(maxLength: 40, nullable: false),
                    Shared = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FileInfo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FileType",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 40, nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    DeleteDate = table.Column<DateTime>(nullable: true),
                    ChangedBy = table.Column<string>(maxLength: 40, nullable: true),
                    IsDeleted = table.Column<int>(nullable: false),
                    FileType = table.Column<string>(maxLength: 20, nullable: false),
                    FileExts = table.Column<string>(maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FileType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SharedFileInfo",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 40, nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    DeleteDate = table.Column<DateTime>(nullable: true),
                    ChangedBy = table.Column<string>(maxLength: 40, nullable: true),
                    IsDeleted = table.Column<int>(nullable: false),
                    OwnerName = table.Column<string>(maxLength: 20, nullable: true),
                    FileId = table.Column<string>(maxLength: 40, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SharedFileInfo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserDataInfo",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 40, nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    DeleteDate = table.Column<DateTime>(nullable: true),
                    ChangedBy = table.Column<string>(maxLength: 40, nullable: true),
                    IsDeleted = table.Column<int>(nullable: false),
                    UserAccount = table.Column<string>(maxLength: 50, nullable: false),
                    UserName = table.Column<string>(maxLength: 20, nullable: false),
                    PassWord = table.Column<string>(maxLength: 20, nullable: false),
                    FolderPath = table.Column<string>(maxLength: 200, nullable: false),
                    Gender = table.Column<string>(nullable: true),
                    Age = table.Column<int>(nullable: false),
                    EmailAddress = table.Column<string>(maxLength: 50, nullable: true),
                    Phone = table.Column<string>(maxLength: 40, nullable: true),
                    Remark = table.Column<string>(maxLength: 233, nullable: true),
                    Cap = table.Column<string>(maxLength: 64, nullable: true),
                    Stored = table.Column<string>(maxLength: 64, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserDataInfo", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FileInfo_Id",
                table: "FileInfo",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserDataInfo_Id",
                table: "UserDataInfo",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserDataInfo_UserAccount",
                table: "UserDataInfo",
                column: "UserAccount",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserDataInfo_UserName",
                table: "UserDataInfo",
                column: "UserName",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FileInfo");

            migrationBuilder.DropTable(
                name: "FileType");

            migrationBuilder.DropTable(
                name: "SharedFileInfo");

            migrationBuilder.DropTable(
                name: "UserDataInfo");
        }
    }
}
