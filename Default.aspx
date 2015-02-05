<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Saxo Api</title>
    <link href="css/index.css" rel="stylesheet" />
    <script src="js/jquery.min.js"></script>
    <script src="js/index.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div id="header">
            <h1>Saxo Api</h1>
        </div>

        <div id="nav" style="float: left; width: 255px;">
            <label>Enter Isbn Num </label>
            <asp:TextBox ID="textIsbnNum" runat="server"></asp:TextBox>&nbsp;                
               <input id="btnSubmit" type="button" onclick="return _validateIsbnNumber();" value="Submit" />
        </div>

        <div id="section">
            <p>Books List</p>
            <div id="loader" style="visibility:hidden;" ><img src="images/loader.gif" alt="loader face" /> </div>
            <div id="mvMain"></div>
           


        </div>


        <div id="footer">
            Copyright © SaxoApi.com
        </div>

    </form>
</body>

</html>


