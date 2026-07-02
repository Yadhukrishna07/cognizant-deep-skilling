package com.library.main;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.library.service.BookService;

public class MainApp {

    public static void main(String[] args) {

    	// Load Spring configuration file(container)
        ApplicationContext context =
                new ClassPathXmlApplicationContext("applicationContext.xml");

        
        // Get BookService bean from Spring container
        BookService service = (BookService) context.getBean("bookService");

        // Call method
        // Test configuration
        service.addBook();
    }
}