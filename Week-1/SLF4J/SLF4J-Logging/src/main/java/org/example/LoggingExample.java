package org.example;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggingExample {

    private static final Logger logger = LoggerFactory.getLogger(LoggingExample.class);

    public static void main(String[] args) {

        logger.info("Application Started");

        try {
            int result = 10 / 0;
            logger.info("Result: {}", result);
        } catch (ArithmeticException e) {
            logger.error("Error occurred: {}", e.getMessage());
        }

        logger.info("Application Finished");
    }
}