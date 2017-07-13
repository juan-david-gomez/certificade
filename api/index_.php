<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';

$app = new \Slim\App;
$app->post('/insert', function (Request $request, Response $response) {
    $data = $request->getParsedBody();
    
    
    // $data = array('name' => 'Bob', 'age' => 40);
	$response = $response->withJson($data);

    return $response;
});
$app->run();