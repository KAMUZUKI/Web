package com.mu.web.servlet;

import com.mu.dao.DbHelper;
import com.mu.domain.Manager;
import com.mu.utils.Md5;
import com.mu.web.model.JsonModel;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @Classname UserServlet
 * @Description 管理员操作
 * @Date 2022/12/8 17:32
 * @author MUZUKI
 */

@WebServlet(name = "UserServlet", value = "/user.action")
public class UserServlet extends CommonServlet{
    /**
     * user.action?op=login
     * 管理员登录
     */
    public void login(HttpServletRequest request, HttpServletResponse response) throws IOException {
        DbHelper db = new DbHelper();
        JsonModel jm = new JsonModel();
        Manager manager = null;
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String sql = "{call login(?,?)}";
        try {
            manager = db.selectProc(sql, Manager.class, username, Md5.getInstance().getMD5(password)).get(0);
            if (manager == null) {
                jm.setCode(0);
                jm.setMsg("用户名或密码错误");
                super.writeJson(jm, response);
                return;
            }
            request.getSession().setAttribute("manager", manager);
        } catch (Exception e) {
            e.printStackTrace();
            jm.setCode(0);
            jm.setMsg(e.getMessage());
            super.writeJson(jm, response);
            return;
        }
        jm.setCode(1);
        jm.setData(manager);
        super.writeJson(jm, response);
    }
}
