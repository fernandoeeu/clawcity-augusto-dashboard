import http.server
import ssl
import socketserver

PORT = 8443

Handler = http.server.SimpleHTTPRequestHandler

httpd = socketserver.TCPServer(("", PORT), Handler)

context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
context.load_cert_chain(
    certfile='/root/clawd/clawcity-dashboard/server.crt',
    keyfile='/root/clawd/clawcity-dashboard/server.key'
)

httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

print(f"Servidor HTTPS rodando na porta {PORT}")
httpd.serve_forever()
