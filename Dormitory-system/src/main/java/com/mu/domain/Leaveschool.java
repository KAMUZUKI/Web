package com.mu.domain;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 
 * @TableName leaveschool
 */
@Data
public class Leaveschool implements Serializable {
    /**
     * id
     */
    private Integer id;

    /**
     * 学生学号
     */
    private String sno;

    /**
     * 学生名字
     */
    private String sname;

    /**
     * 学生手机号
     */
    private String phone;

    /**
     * 学生离校原因
     */
    private String purpose;

    /**
     * 离校时间
     */
    private Date leavetime;

    /**
     * 返校时间
     */
    private Date backtime;

    /**
     * 执行人id
     */
    private Integer managerid;

    private static final long serialVersionUID = 1L;

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", sno=").append(sno);
        sb.append(", sname=").append(sname);
        sb.append(", phone=").append(phone);
        sb.append(", purpose=").append(purpose);
        sb.append(", leavetime=").append(leavetime);
        sb.append(", backtime=").append(backtime);
        sb.append(", managerid=").append(managerid);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}