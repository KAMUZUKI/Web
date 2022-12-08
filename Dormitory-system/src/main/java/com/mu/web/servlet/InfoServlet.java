package com.mu.web.servlet;

import com.mu.domain.*;
import com.mu.dao.DbHelper;
import com.mu.web.model.JsonModel;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * @date : 2022-11-06 19:32
 * @description : 信息获取
 * @author MUZUKI
 **/
@WebServlet(name = "InfoServlet", value = "/info.action")
public class InfoServlet extends CommonServlet {
    /**
     * info.action?op=getAllStudent
     * 获取所有用户信息
     */
    protected void getAllStudent(HttpServletRequest request, HttpServletResponse response) throws IOException {
        DbHelper db = new DbHelper();
        JsonModel jm = new JsonModel();
        Student student = new Student();
        List<Student> list = null;
        String sql = "{call select_s()}";
        try {
            list = db.selectProc(sql, Student.class);
            if (list == null && list.size() <= 0) {
                jm.setCode(0);
                jm.setMsg("无数据...");
                super.writeJson(jm, response);
                return;
            }
        } catch (Exception e) {
            e.printStackTrace();
            jm.setCode(0);
            jm.setMsg(e.getMessage());
            super.writeJson(jm, response);
            return;
        }
        jm.setCode(1);
        jm.setData(list);
        super.writeJson(jm, response);
    }

    /**
     * info.action?op=deleteStudentById
     * 通过学生id删除学生信息
     */
    protected void deleteStudentById(HttpServletRequest request, HttpServletResponse response) throws IOException {
        DbHelper db = new DbHelper();
        JsonModel jm = new JsonModel();
        String sno = request.getParameter("sno");
        List<Student> list = null;
        String sql = "{call delete_s(?)}";
        try {
            list = db.selectProc(sql, Student.class,sno);
            if (list == null && list.size() <= 0) {
                jm.setCode(0);
                jm.setMsg("无数据...");
                super.writeJson(jm, response);
                return;
            }
        } catch (Exception e) {
            e.printStackTrace();
            jm.setCode(0);
            jm.setMsg(e.getMessage());
            super.writeJson(jm, response);
            return;
        }
        jm.setCode(1);
        jm.setData(list);
        super.writeJson(jm, response);
    }

    /**
     * info.action?op=getAllVisiter
     * 获取所有来访者信息
     */
    protected void getAllVisiter(HttpServletRequest request, HttpServletResponse response) throws IOException {
        DbHelper db = new DbHelper();
        JsonModel jm = new JsonModel();
        Visiter visiter = new Visiter();
        List<Visiter> list = null;
        String sql = "{call select_v()}";
        try {
            list = db.selectProc(sql, Visiter.class);
            if (list == null && list.size() <= 0) {
                jm.setCode(0);
                jm.setMsg("无数据...");
                super.writeJson(jm, response);
                return;
            }
        } catch (Exception e) {
            e.printStackTrace();
            jm.setCode(0);
            jm.setMsg(e.getMessage());
            super.writeJson(jm, response);
            return;
        }
        jm.setCode(1);
        jm.setData(list);
        super.writeJson(jm, response);
    }
}
