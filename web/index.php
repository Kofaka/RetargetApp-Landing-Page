<?php

require('../vendor/autoload.php');

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

$intercom_id = [
    'prod' => 'cqrvu7cp',
    'dev' => 'voyg1t4p',
];

$app = new Silex\Application();
$app['debug'] = ($_SERVER['ENV'] != 'prod');
$app['host'] = ($_SERVER['HOST'] === false) ? 'retargetapp.com' : $_SERVER['HOST'];

$app['INTERCOM_ID'] = ($_SERVER['ENV'] == 'prod' ? $intercom_id['prod'] : $intercom_id['dev']);

// Register the monolog logging service
$app->register(new Silex\Provider\MonologServiceProvider(), array(
    'monolog.logfile' => 'php://stderr',
));

// Register view rendering
$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__ . '/../views',
));

// Our web handlers

$app->get('/', function () use ($app) {
    $app['monolog']->addDebug('logging output.');
    return $app['twig']->render('index.twig');
});

$app->post('/collect-email', function (Request $request) use ($app) {
    $data = json_decode($request->getContent(), true);
    $file = fopen(__DIR__ . '/feedbacks.tsv', 'a');
    fwrite($file, $data['email'] . "\t" . $data['platform'] . "\n");
    fclose($file);
    return new Response('', 200);
});

$app->error(function (Exception $e) use ($app) {
    if ($e instanceof NotFoundHttpException) {
        return $app['twig']->render('404.twig', ['code' => 404, 'host' => $app['host']]);
    }
});

$app->run();
