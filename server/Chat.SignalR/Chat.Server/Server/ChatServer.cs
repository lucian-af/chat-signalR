using System.Collections.Generic;
using Chat.Server.Server.Domain;
using Chat.Server.Server.Helpers;
using Microsoft.AspNetCore.SignalR;

namespace Chat.Server.Server
{
    public class ChatServer : Hub
    {
        static private List<Message> lstMessages;

        public ChatServer()
        {
            if (lstMessages is null)
            {
                lstMessages = new List<Message>();
            }
        }

        public void NewMessage(string userName, string message)
        {
            Clients.All.SendAsync(MethodServer.NewMessage, userName, message);
            lstMessages.Add(new Message(
                userName: userName,
                text: message
            ));
        }

        public void NewUser(string userName, string connectionId)
        {
            Clients.Client(connectionId).SendAsync(MethodServer.PreviousMessages, lstMessages);
            Clients.All.SendAsync(MethodServer.NewUser, userName);
        }
    }
}
