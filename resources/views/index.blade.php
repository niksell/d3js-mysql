<!doctype html>
<html class="no-js" ng-app="app">

<head>
    <!--[if lte IE 10]>
    <script type="text/javascript">document.location.href ='/unsupported-browser'</script>
    <![endif]-->
    <meta charset="utf-8">
    <title>Tooristas PRO</title>
    <meta name="description" content="">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=RobotoDraft:100,100italic,300,300italic,400,500,700,900,400italic">
    <link rel="icon" type="image/png" href="{{url('dist')}}/favicon.png">
    <link rel="stylesheet" href="{{url('dist')}}/styles/vendor.css">
    <link rel="stylesheet" href="{{url('dist')}}/styles/app.css">
</head>

<body translate-cloak="" ng-class="bodyClasses">
<div layout="row" class="full-height" ui-view="root"></div>
<script src="{{url('dist')}}/scripts/vendor.js"></script>
<script src="{{url('dist')}}/scripts/app.js"></script>
</body>

</html>
