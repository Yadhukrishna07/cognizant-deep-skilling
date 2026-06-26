CREATE OR REPLACE PROCEDURE display_message
IS
BEGIN
    DBMS_OUTPUT.PUT_LINE('Hello from Stored Procedure!');
END;
/

BEGIN
    display_message;
END;
/