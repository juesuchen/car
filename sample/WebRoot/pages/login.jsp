<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/";
%>
<!DOCTYPE html>
<html>
<head>
<base href="<%=basePath %>">
<meta charset="UTF-8">
<title>登录</title>
<script src="ext4/ext-core.js"></script>
<script src="ext4/Cookies.js"></script>
<script src="js/login.js"></script>
</head>
<body>
<form action="login/login" method="post">
用户名：<input type="text" name="userid" /><br>
密码：<input type="password" name="password" /><br>
<input type="submit" value="Login"><br>
${message}
</form>
</body>
</html>