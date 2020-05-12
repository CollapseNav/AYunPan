namespace Api
{
    public class TokenInfo
    {
        public string Secret { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public int Expriation { get; set; }
    }
}