<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
    <head>
        <title>Phone Applet Project</title>
        <!--script type="text/javascript" src="http://code.jquery.com/jquery-1.7.1.min.js"></script-->
        <script type="text/javascript" src="js/jquery-1.2.6.min.js"></script>
        <!--<script type="text/javascript" src="js/jquery_phone.js"></script>-->
        <script type="text/javascript" src="js/jquery_buttom_phone.js"></script>
        
        <script type="text/javascript">
            $(function(){
				$(".phone").webphone({
                   userPart: "<?php echo $_GET['u']; ?>",
                   password: "<?php echo $_GET['p']; ?>",
                   dominio: "<?php echo $_GET['h']; ?>",
				   destino: "<?php echo $_GET['dest']; ?>"
               });
            });
        </script>
    </head>
    <body>
        <div class="phone box-shadow"></div>
    </body>
</html>