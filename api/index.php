<?php

require 'vendor/autoload.php';
require 'vendor/mpdf/mpdf/mpdf.php';

$html = "";

$style='<style>
.date-info{
    position:absolute;
    top: 500px;
    left: 820px;
}
.text-certificate{
    position:absolute;
    top: 215px;
    left: 270px;
    text-align:center;
}
.text-empresa{
    position:absolute;
    top: 290px;
    left: 260px;
    text-align:center;
}
.text-realizado{
    position:absolute;
    top: 330px;
    left: 435px;
    text-align:center;
    font-style: italic;
}
.text-curso{
    position:absolute;
    top: 365px;
    left: 300px;
    text-align:center;
    font-style: italic;
}

h1{
    //font-size:25px;
}
p,h1{
    font-family:Arial;font-weight: bold;
}
.wrap{
    width: 1060px;height: 560px;background: url(img/certificado.png) center center;background-repeat: no-repeat;
}
</style>';

$html .= $style;
$html .="<div class='text-certificate' style=''>";
    $html .='<h1 style="">DIEGO FERNANDO ESCOBAR ZAPATA</h1>';
    $html .='<p style="">C.C: 98532511</p>';
$html .= "</div>";

$html .="<div class='text-empresa'>";
    $html .='<h3>EMPRESA: ESTRUCTURAS Y DESARROLLO S.A</h3>';
$html .="</div>";

$html .="<div class='text-realizado'>";
    $html .='<h3>REALIZO EL CURSO DE:</h3>';
$html .="</div>";

$html .="<div class='text-curso'>";
    $html .='<h3>REENTRENAMIENTO PARA TRABAJOS EN ALTURAS</h3>';
    $html .='<p>Con una intensidad de 20 horas teórico prácticas </p>';
    $html .='<p>Realizado los dias 24,25 DE JUNIO del 2017</p>';
$html .="</div>";

$html .= "<div class='date-info'>";
    $html .="<p>6/27/2017</p>";
    $html .="<p>COD REG:607418</p>";
$html .="</div>";


$html .="<div class='wrap' style=''>";

$html .="</div>";

// $mpdf = new \Mpdf\Mpdf();
$mpdf = new Mpdf('utf-8', 'A4-L');
$mpdf->writeHtml($html);
$mpdf->Output();
// echo $html;


// $app = new \Slim\App;
// $app->get('/hello/{name}', function (Request $request, Response $response) {
//     $name = $request->getAttribute('name');
//     $response->getBody()->write("Hello, $name");

//     return $response;
// });
// $app->run();