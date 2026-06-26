package org.example;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class AAATest {

    private Calculator calculator;

    @Before
    public void setUp() {
        calculator = new Calculator();
        System.out.println("Setup Method Executed");
    }

    @After
    public void tearDown() {
        System.out.println("Teardown Method Executed");
    }

    @Test
    public void testSubtraction() {

        // Arrange
        int num1 = 10;
        int num2 = 5;

        // Act
        int result = calculator.subtract(num1, num2);

        // Assert
        assertEquals(5, result);

        System.out.println("AAA Pattern Test Passed");
    }
}