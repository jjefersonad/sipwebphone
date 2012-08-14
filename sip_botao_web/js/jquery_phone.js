/*
 * Plugin jquery webphone
 */
(function($) {
	$.fn.webphone = function(options) {
		/*
		 * Configuracoes padroes
		 */
		options = $.extend({
			port: 5060,
			mediaMode: "captureAndPlayback",
			mediaDebug: "false",
			rtp_port: "8000"
		}, options);

		document.onKeydown
		
		var applet;
		var thisObj = this;
		var appletCode = "net.sourceforge.peers.ui.SipApplet.class";
		var appletName = "webphone";
		var appletArchive = "secult_peer_sip.jar";
		var appletHtml;
		
		var numero_chamar = "";

		function __iniciar(options) {
		
			// Inicia jquery_phone.css no head
			$("head").append('<link href="css/jquery_phone.css" rel="stylesheet" type="text/css">');
			
			montaTelefone();
			eventosTelefone();
			
			appletHtml 
				= "<applet id='" + appletName + "' archive='" + appletArchive + "' code='" + appletCode + "' width='0' height='0'>"
				+ "		<param name='userpart' value='" + options.userPart + "'>"
				+ "		<param name='password' value='" + options.password + "'>"
				+ "		<param name='domain' value='" + options.dominio + "'>"
				+ "		<param name='port' value='" + options.port + "'>"
				+ "		<param name='mediaMode' value='" + options.mediaMode + "'>"
				+ "		<param name='mediaDebug' value='" + options.mediaDebug + "'>"
				+ "		<param name='rtp_port' value='" + options.rtp_port + "'>"
				+ "</applet>";
			
			thisObj.append("<div id='container_applet'>" + appletHtml+ "</div>");
		
			applet = document.getElementById(appletName);
		}
		
		function __fix() {
			/* Conseguir uma melhor maneira de determinar que houve o erro. */
			 if ($("#status_code").val() == "") {
				$("link[href*='css/jquery_phone.css']").remove();
				$("#webphone_container").remove();
				
				setTimeout(function() {
					__iniciar(options);
				}, 1500);
			}
		}
		
		/**
		 * O botão será usado tanto para efetuar quanto para atender uma ligação.
		 */
		function __chamar() {
			var event = 102;
			
			var code = $("#status_code").val();
			
			if (code != "" && parseInt(code) == 150) {
				event = 104;
			}
			
			applet.setCallTo(numero_chamar);
			applet.setEvent(event);
		}
		
		/**
		 * O botão será usado tanto para desligar tanto para rejeitar uma ligação.
		 */
		function __desligar() {
			var event = 103;
			
			var code = $("#status_code").val();
			
			if (code != "" && parseInt(code) == 150) {
				event = 105;
			}
			applet.setEvent(event);
		}
		
		function montaTelefone() {
			var webphone_container
				= '<div id="webphone_container">'
				+ '		<div id="teclas">'
				+ '			<div id="acoes">'
				+ '				<div id="minimizar" title="Minimizar"></div>'
				+ '			</div>'
				+ '			<div id="status_container">'
				+ '				<div id="img_status"></div>'
				+ '				<div id="texto_status"></div>'
				+ '			</div>'
				+ '			<div id="visor_container">'
				+ '				<input id="visor" disabled="true" maxlength="16" type="text" value="" />'
				+ '			</div>'
				+ '			<input id="status_code" type="hidden" value="" />'
				+ '			<div id="chamar" title="chamar">chamar</div>'
				+ '			<div id="encerrar" title="encerrar">encerrar</div>'
				+ '			<div id="digt1" title="1" class="botao">1</div>'
				+ '			<div id="digt2" title="2" class="botao">2</div>'
				+ '			<div id="digt3" title="3" class="botao">3</div>'
				+ '			<div id="digt4" title="4" class="botao">4</div>'
				+ '			<div id="digt5" title="5" class="botao">5</div>'
				+ '			<div id="digt6" title="6" class="botao">6</div>'
				+ '			<div id="digt7" title="7" class="botao">7</div>'
				+ '			<div id="digt8" title="8" class="botao">8</div>'
				+ '			<div id="digt9" title="9" class="botao">9</div>'
				+ '			<div id="digt_ast" title="*" class="botao">*</div>'
				+ '			<div id="digt0" title="0" class="botao">0</div>'
				+ '			<div id="digt_sust" title="#" class="botao">#</div>'
				+ '		</div>'
				+ '</div>';
			thisObj.append(webphone_container);
		}
		/**
		 * Função para setar número digitado no visor e incrementar na variável 'numero_chamar', 
		 * que guarda o ramal que será feita a ligação.
		 */
		function digitar(seletor, valor) {
			$(seletor).addClass("botao_hover");
			
			setTimeout(function() {
				if (numero_chamar.length <= 16) {
					numero_chamar += valor;

					visor.visorphone({
						tipo : "numero",
						msg : numero_chamar
					});
				}
				$(seletor).removeClass("botao_hover");
				$("#chamar").removeClass("chamar_disabled");
				$("#chamar").addClass("chamar"); // Habilitar o botão 'chamar'
			}, 300);
		}
			
		function eventosTelefone() {
			var visor = $("#visor");
			
			// evento botões ligar e desligar
			$("#chamar, #encerrar").click(function() {
				if ($(this).hasClass("chamar")) {
					__chamar();
				} else if ($(this).hasClass("encerrar")) {
					__desligar();
				}
			});

			// evento click botao
			$(".botao").click(function() {
				if (numero_chamar.length <= 16) {
					numero_chamar += $(this).attr('title');
				}
				visor.visorphone({
					tipo : "numero",
					msg : numero_chamar
				});
				$("#chamar").removeClass("chamar_disabled");
				$("#chamar").addClass("chamar");
			});
			
			$("#minimizar").click(function() {
				$(".phone").fadeOut("slow", function() {
					$(".hidden_phone").fadeIn("slow");
				});
			});
			
			$(".maximizar").click(function() {
				$(".hidden_phone").fadeOut("slow", function() {
					$(".phone").fadeIn("slow");
				});
			});
			
			if ($("#webphone_container").is(":visible")) {
				$("body").keyup(function(e) {
					// alert(e.keyCode);
					switch (e.keyCode) {
						case 106:
							digitar("#digt_ast", "*");
							break;
						case 56:
							if (e.shiftKey) {
								digitar("#digt_ast", "*");
							}
							break;
						case 51:
							if (e.shiftKey) {
								digitar("#digt_sust", "#");
							}
							break;
						case 96:
							digitar("div#digt0", "0");
							break;
						case 97:
							digitar("div#digt1", "1");
							break;
						case 98:
							digitar("div#digt2", "2");
							break;
						case 99:
							digitar("div#digt3", "3");
							break;
						case 100:
							digitar("div#digt4", "4");
							break;
						case 101:
							digitar("div#digt5", "5");
							break;
						case 102:
							digitar("div#digt6", "6");
							break;
						case 103:
							digitar("div#digt7", "7");
							break;
						case 104:
							digitar("div#digt8", "8");
							break;
						case 105:
							digitar("div#digt9", "9");
							break;
						default:
							break;
					}

					if (e.keyCode == 8) {
						numero_chamar = numero_chamar.substring(0, (numero_chamar.length - 1));
						visor.visorphone({
							tipo : "numero",
							msg : numero_chamar
						});
						if (numero_chamar == "") {
							$("#chamar").removeClass("chamar");
							$("#chamar").addClass("chamar_disabled");
						}
					}
				});
			}
		}
		setTimeout(function() {
			__iniciar(options);
		}, 1000);
		
		/* Solução paleativa para problema no Firefox com o Applet. */
		if ($.browser.mozilla) {
			setTimeout(function() {
				__fix();
			}, 2000);
		}
	};

	$.fn.visorphone = function(msgvisor) {
		if (msgvisor.tipo == "erro") {
			this.attr('class', 'errovisor');
			this.val(msgvisor.msg);
		} else if (msgvisor.tipo == "numero") {
			this.attr('class', 'msgvisor');
			this.val(msgvisor.msg);
		}
	};

})(jQuery);

var counter;
var contato = "";

function set_contato(contact) {
	contato = contact;
}
/* 
 * Método compartilhado pelo applet. Este método irá atualizar o status e chamar métodos para manipulação da UI
 * caso seja necessário.
 */
function statusphone(code) {
	$("#img_status").removeAttr("class");
	
	switch(code) {
		case 0: // Registrando
			atualizar_status("status_nao_registrado", "Registrando...");
			
			$("#chamar").addClass("chamar_disabled");
			$("#encerrar").addClass("encerrar_disabled");
			break;
		case 102: // Chamar
			atualizar_status("status_chamando", "Conectando...");
			
			$("#chamar").removeClass("chamar");
			$("#chamar").addClass("chamar_disabled");
			
			$("#encerrar").removeClass("encerrar_disabled");
			$("#encerrar").addClass("encerrar");
			break;
		case 150: // Chamada chegando
			atualizar_status("status_chamando", contato + " chamando");
			
			$("#chamar").removeClass("chamar_disabled");
			$("#chamar").addClass("chamar");
			
			$("#encerrar").removeClass("encerrar_disabled");
			$("#encerrar").addClass("encerrar");
			break;
		case 180: // Chamando
			atualizar_status("status_chamando", "Chamando...");
			break;
		case 200: // Registrou com sucesso
			atualizar_status("status_disponivel", "Disponível");
			
			if ($("#visor").val() != "") {
				$("#chamar").addClass("chamar");
				$("#chamar").removeClass("chamar_disabled");
			}
			break;
		case 210: // Atendi
			atualizar_status("status_em_ligacao", "");
			
			counter = contador_chamada();
			
			$("#chamar").removeClass("chamar");
			$("#chamar").addClass("chamar_disabled");
			break;
		case 220: // Atendeu
			atualizar_status("status_em_ligacao", "");
			
			counter = contador_chamada();
			
			$("#chamar").removeClass("chamar");
			$("#chamar").addClass("chamar_disabled");
			break;
		case 401: // Falha no registro
			atualizar_status("status_nao_registrado", "Não registrado");
			break;
		case 404: // Usuário não encontrado
			atualizar_status("status_ocupado", "Usuário não encontrado");
			
			setTimeout("atualizar_status('status_disponivel', 'Disponível')", 3000);
			
			$("#encerrar").removeClass("encerrar");
			$("#encerrar").addClass("encerrar_disabled");
			
			if ($("#visor").val() != "") {
				$("#chamar").removeClass("chamar_disabled");
				$("#chamar").addClass("chamar");
			}
			break;
		case 480: // Indisponivel temporariamente
			atualizar_status("status_ocupado", "Indisponivel temporariamente");
			
			setTimeout("atualizar_status('status_disponivel', 'Disponível')", 3000);
			
			$("#encerrar").removeClass("encerrar");
			$("#encerrar").addClass("encerrar_disabled");
			
			if ($("#visor").val() != "") {
				$("#chamar").removeClass("chamar_disabled");
				$("#chamar").addClass("chamar");
			}
			break;
		case 486: // Ocupado
			atualizar_status("status_ocupado", "Usuário Ocupado");
			
			setTimeout("atualizar_status('status_disponivel', 'Disponível')", 3000);
			
			$("#encerrar").removeClass("encerrar");
			$("#encerrar").addClass("encerrar_disabled");
			
			if ($("#visor").val() != "") {
				$("#chamar").removeClass("chamar_disabled");
				$("#chamar").addClass("chamar");
			}
			break;
		case 487: // Requisição terminada
			atualizar_status("status_disponivel", "Disponível");
			
			if ($("#visor").val() != "") {
				$("#chamar").removeClass("chamar_disabled");
				$("#chamar").addClass("chamar");
			}
			break;
		case 490: // Rejeitei
			atualizar_status("status_disponivel", "Disponível");
			
			$("#encerrar").removeClass("encerrar");
			$("#encerrar").addClass("encerrar_disabled");
			break;
		case 503: // Serviço indisponível
			atualizar_status("status_ocupado", "Serviço indisponível");
			
			setTimeout("atualizar_status('status_disponivel', 'Disponível')", 3000);
			
			$("#encerrar").removeClass("encerrar");
			$("#encerrar").addClass("encerrar_disabled");
			
			if ($("#visor").val() != "") {
				$("#chamar").addClass("chamar");
				$("#chamar").removeClass("chamar_disabled");
			}
			break;
		case 603: // Desligou/rejeitou
			atualizar_status("status_ocupado", "Chamada Finalizada");
			
			setTimeout("atualizar_status('status_disponivel', 'Disponível')", 3000);
			clearInterval(counter);
			
			$("#encerrar").removeClass("encerrar");
			$("#encerrar").addClass("encerrar_disabled");
			
			if ($("#visor").val() != "") {
				$("#chamar").addClass("chamar");
				$("#chamar").removeClass("chamar_disabled");
			}
			break;
		case 610: // Desliguei
			atualizar_status("status_ocupado", "Chamada Finalizada");
			
			setTimeout("atualizar_status('status_disponivel', 'Disponível')", 3000);
			clearInterval(counter);
			
			$("#encerrar").removeClass("encerrar");
			$("#encerrar").addClass("encerrar_disabled");
			
			if ($("#visor").val() != "") {
				$("#chamar").addClass("chamar");
				$("#chamar").removeClass("chamar_disabled");
			}
			break;
		default: // Outros erros
			atualizar_status("status_ocupado", "Erro " + code + " no servidor");
			
			setTimeout("atualizar_status('status_disponivel', 'Disponível')", 3000);
			break;
	}
	$("#status_code").val(code);
}

/* Atualiza as divs de status do webphone */
function atualizar_status(classe_img, texto) {
	if (classe_img != "") {
		$("#img_status").removeAttr("class");
		$("#img_status").addClass(classe_img);
	}
	if (texto != "") {
		$("#texto_status").html(texto);
	}
}

/* Responsável por exibir o timer durante a chamada. */
function contador_chamada() {
	var sec = 0;
	var min = 0;
	var hour = 0;
	
	/* Trecho aninhado para adicionar 0 ao número caso o mesmo seja menor que 10. */
	function pad(num) {
		if (num < 10) {
			return '0' + num;
		}
		return num;
	}
	
	/* Trecho aninhado para atualizar os contadores e alterar o conteúdo do html. */
	return setInterval(function() {
	  if (sec == 60) {
		  min++;
		  sec = 0;
	  }
	  if (min == 60) {
		  hour++;
		  min = 0;
	  }
	  $('#texto_status').html(pad(hour) + ":" + pad(min) + ":" + pad(sec) + "min");
	  sec++;
	}, 1000);
}