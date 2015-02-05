using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Web.Configuration;
using System.Data.SqlClient;

public partial class _Default : System.Web.UI.Page
{
    private readonly static string formattedUri =
           "http://api.saxo.com/v1/products/products.json?key=08964e27966e4ca99eb0029ac4c4c217&isbn=";
    protected void Page_Load(object sender, EventArgs e)
    {
        textIsbnNum.Attributes.Add("placeholder", "Enter Isbn Number");
    }

    [WebMethod]
    public static string GetDataByISBNNumber(string ISBNNumber)
    {
        var JsonUrl = formattedUri + ISBNNumber;
        HttpWebRequest webRequest = GetWebRequest(JsonUrl);
        HttpWebResponse response = (HttpWebResponse)webRequest.GetResponse();
        string jsonResponse = string.Empty;
        using (StreamReader sr = new StreamReader(response.GetResponseStream()))
        {
            jsonResponse = sr.ReadToEnd();
        }
        return jsonResponse;
    }

    [WebMethod]
    public static string UpdateByISBNNumberAndChecked(string ISBNNumber, string BookID, bool Checked)
    {

        string jsonResponse = string.Empty;
        if (BookID != "" & ISBNNumber != "")
        {
            try
            {
                string conString = "";
                using (SqlConnection c = new SqlConnection(conString))
                {
                    c.Open();
                    // 2
                    // Create new DataAdapter
                    SqlDataAdapter a = new SqlDataAdapter("SELECT * FROM tblLog where ISBN_Number='" + ISBN_Number + "' and BookId = '"+ BookID +",", conString);
                    DataTable t = new DataTable();
                    a.Fill(t);
                    if (t.Rows.Count == 0)
                    {
                        using (SqlConnection cn = new SqlConnection(@"Data Source=(LocalDB)\v11.0;AttachDbFilename=D:\Nerraj\Test\SaxoApi2Pankaj\App_Data\sampleSaxo.mdf;Integrated Security=True;Connect Timeout=30"))
                        using (SqlCommand cmd = new SqlCommand())
                        {
                            cmd.CommandText = "Insert into tblLog (ISBN_Number,BookId,Date_Added,IsChecked) Values('" + ISBNNumber + "' , '" + BookID + "', '" + DateTime.Now + "','" + Checked + "')";
                            int result = cmd.ExecuteNonQuery();

                            cn.Close();
                        }
                    }
                    else
                    {
                        using (SqlCommand cmdUpd = new SqlCommand())
                        {
                            cmdUpd.CommandText = "updae tblLog set Date_Added='" + DateTime.Now + "',IsChecked='"+ Checked +"' where ISBNNumber='" + ISBNNumber + "' and BookId ='" + BookID + "'";
                            int result = cmdUpd.ExecuteNonQuery();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
            }
        }
        return jsonResponse;
    }

    private static HttpWebRequest GetWebRequest(string JsonUrl)
    {
        Uri serviceUri = new Uri(JsonUrl, UriKind.Absolute);
        return (HttpWebRequest)System.Net.WebRequest.Create(serviceUri);
    }
}