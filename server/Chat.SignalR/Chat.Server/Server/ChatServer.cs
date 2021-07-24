using Chat.Server.Server.Helpers;
using Microsoft.AspNetCore.SignalR;

namespace Chat.Server.Server
{
    public class ChatServer : Hub
    {
        public void NewMessage(string userName, string message)
        {
            Clients.All.SendAsync(MethodServer.NewMessage, userName, message);
        }
    }
}
