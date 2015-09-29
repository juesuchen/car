<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%	//登陆验证
	if(null == session.getAttribute("loginUser")){
		response.sendRedirect("login");
	}
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath %>">
<title>Mini Soft</title>

<link rel="stylesheet" type="text/css" href="ext4/resources/css/ext-all.css" />

<link rel="stylesheet" type="text/css" href="resources/css/desktop.css" />
<link rel="stylesheet" type="text/css" href="resources/css/styles.css" />

<script type="text/javascript" src="ext4/ext-all.js"></script>
<script type="text/javascript" src="ext4/locale/ext-lang-zh_CN.js"></script>
<!-- 
<script type="text/javascript" src="js/jsCore.js"></script>
<script type="text/javascript" src="js/myux-all.js"></script>
<script type="text/javascript" src="js/modulesCore.js"></script>
 -->	
 <script type="text/javascript" src="js/app.js"></script>
</head>

<body>

</body>
</html>