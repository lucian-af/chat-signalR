namespace Chat.Server.Server.Domain
{
    public class Message
    {
        public Message(string userName, string text)
        {
            UserName = userName;
            Text = text;
        }

        public string UserName { get; }
        public string Text { get; }
    }
}
