sipwebphone
===========

Programadores envolvidos:
Jeferson: jjefersonad@gmail.com
Roque Marcelo: roque.santoro@gmail.com

Sip Webphone é um plugin jquery que funciona em conjuto com um applet, que teve seu desenvolvimento baseado no projeto de código aberto "Peers Java SIP Softphone"
Link para acesso é http://peers.sourceforge.net/

Pelo fato de ser um applet tem a necessidade de ter java 1.6.0 ou superior instalado.

Foi pensado como um plugin jquery então para ser adicionado na página web é necessário adicionar os seguintes scripts:

<script type="text/javascript" src="js/jquery-1.2.6.min.js"></script>
<script type="text/javascript" src="js/jquery_buttom_phone.js"></script>

O css fica a critério do desenvolvedor do projeto.

Script para iniciar o applet:
<script type="text/javascript">
	$(function(){
		//phone é o id da div onde será iniciado o applet
		$("#phone").webphone({
		   userPart: "usuarioSip",
		   password: "senhaUsuarioSip",
		   dominio: "ip_do_servidor_asterisk",
		   destino: ""//(Ramal ou número de destino para o qual irá destinar a ligação)
	   });
	});
</script>

Div onde irá iniciar o applet
<div class="phone box-shadow"></div>