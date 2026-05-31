import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/addExpense")
public class AddExpenseServlet extends HttpServlet {

    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        String description =
                request.getParameter("description");

        double amount =
                Double.parseDouble(
                request.getParameter("amount"));

        String category =
                request.getParameter("category");

        try {

            Connection con =
                    DBConnection.getConnection();

            String sql =
                "INSERT INTO expenses(description,amount,category) VALUES(?,?,?)";

            PreparedStatement ps =
                    con.prepareStatement(sql);

            ps.setString(1, description);
            ps.setDouble(2, amount);
            ps.setString(3, category);

            ps.executeUpdate();

            response.sendRedirect("index.html");

        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}