package br.ufmg.dcc.nanotec.jsf;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Map;

import javax.faces.application.Resource;
import javax.faces.context.FacesContext;

import org.apache.myfaces.shared.resource.ResourceLoaderUtils;

import br.ufmg.dcc.nanotec.bean.AbstractBean;
import br.ufmg.dcc.nanotec.bean.CristalsBean;
import br.ufmg.dcc.nanotec.hdf.HDFLoader;
import ncsa.hdf.object.h5.H5File;

/**
 * Class responsible to transform a {@link H5File}
 * in a png image and serve it as a {@link Resource}
 * @author Jeronimo Nunes Rocha
 *
 */
public class HDFResource extends Resource {
	
	private File file;
	private double range;

	/**
	 * Creates a new {@link HDFResource}
	 * @param resourceName The resource name that must be the index of the file in {@link CristalsBean#getAvailableFiles()}
	 * @param libraryName The library name that must be HDF
	 */
	public HDFResource(String resourceName, String libraryName) {
		CristalsBean cristalsBean = AbstractBean.getSessionBean(CristalsBean.class);
		this.file = cristalsBean.getAvailableFiles().get(Integer.valueOf(resourceName));
		this.range = cristalsBean.getRange();
		super.setContentType("image/png");
		super.setResourceName(resourceName);
		super.setLibraryName(libraryName);
	}

	@Override
	public InputStream getInputStream() throws IOException {
		try {
			BufferedImage image = HDFLoader.getPicture(HDFLoader.getDataset(file),range);
			return new ImageInputStream(image,"png");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public String getRequestPath() {
		return MessageFormat.format("{0}/javax.faces.resource/{1}.xhtml?ln={2}", 
				AbstractBean.getHttpServletRequest().getContextPath(),
				super.getResourceName(),
				super.getLibraryName());
	}

	@Override
	public Map<String, String> getResponseHeaders() {
		Map<String,String> headers = new HashMap<>();
		headers.put("Pragma", "no-cache");
		headers.put("Last-Modified", ResourceLoaderUtils.formatDateHeader(file.lastModified()));
		headers.put("Expires", ResourceLoaderUtils.formatDateHeader(System.currentTimeMillis()));
		return headers;
	}

	@Override
	public URL getURL() {
		return null;
	}

	@Override
	public boolean userAgentNeedsUpdate(FacesContext context) {
		return true;
	}

}
