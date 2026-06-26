package org.example;

import org.junit.Test;

import static org.junit.Assert.*;

public class AssertionsTest {

    @Test
    public void testAssertions() {

        // assertEquals
        assertEquals(10, 5 + 5);

        // assertTrue
        assertTrue(20 > 10);

        // assertFalse
        assertFalse(5 > 10);

        // assertNull
        String name = null;
        assertNull(name);

        // assertNotNull
        Calculator calculator = new Calculator();
        assertNotNull(calculator);

        System.out.println("All Assertions Passed Successfully!");
    }
}