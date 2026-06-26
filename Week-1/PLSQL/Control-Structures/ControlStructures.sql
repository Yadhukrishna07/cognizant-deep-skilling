DECLARE
    num NUMBER := 10;
BEGIN
    IF num > 0 THEN
        DBMS_OUTPUT.PUT_LINE('Positive Number');
    ELSE
        DBMS_OUTPUT.PUT_LINE('Negative Number');
    END IF;
END;
/