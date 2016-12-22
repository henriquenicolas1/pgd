package br.ufmg.dcc.nanotec.bean;

import java.io.Serializable;
import java.util.Map;

import javax.faces.bean.ManagedBean;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public abstract class AbstractBean implements Serializable {
	
	private static final long serialVersionUID = 1L;

	public static ExternalContext getExternalContext(){
		return FacesContext.getCurrentInstance().getExternalContext();
	}
	
	public static Map<String, String> getRequestParameterMap(){
		return getExternalContext().getRequestParameterMap();
	}
	
	public static HttpServletRequest getHttpServletRequest(){
		return (HttpServletRequest) getExternalContext().getRequest();
	}
	
	public static HttpSession getSession(){
		return getHttpServletRequest().getSession();
	}
	
	@SuppressWarnings("unchecked")
	public static <T extends AbstractBean> T getSessionBean(Class<T> beanClass){
		return (T) getSession().getAttribute(beanClass.getAnnotation(ManagedBean.class).name());
	}

}
