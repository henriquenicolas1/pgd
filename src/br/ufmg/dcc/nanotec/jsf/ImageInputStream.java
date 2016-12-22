package br.ufmg.dcc.nanotec.jsf;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;

import javax.imageio.ImageIO;
import javax.imageio.spi.ImageReaderWriterSpi;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Input Stream to serve image content
 * @author Jeronimo Nunes Rocha
 *
 */
public class ImageInputStream extends PipedInputStream {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ImageInputStream.class);
	
	/**
	 * Uses the given image to provide data as a {@link InputStream}
	 * @param image The Image to get data from
	 * @param formatName The informal format of the image
	 * @see ImageReaderWriterSpi#getFormatNames()
	 * @throws IOException
	 */
	public ImageInputStream(final BufferedImage image, final String formatName) throws IOException {
		
		// The PipedOutputStream must be created here, not inside the thread
		// If it's created inside the thread this could be unconnected when
		// InputStream#read is called
		final PipedOutputStream os = new PipedOutputStream(this);
		
		new Thread(){
			public void run() {
				try {
					ImageIO.write(image, formatName, os);
				} catch (IOException e) {
					LOGGER.error("Failed to write image",e);
				} finally {
					try { os.close(); } catch (Exception e) { /*ignore*/ }
				}			
			}
		}.start();
	}
	
	@Override
	public void connect(PipedOutputStream src) throws IOException {
		throw new IOException("Already connected");
	}

}