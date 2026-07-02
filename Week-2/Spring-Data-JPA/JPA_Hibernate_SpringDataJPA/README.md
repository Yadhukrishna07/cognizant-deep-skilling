# Hands-on 4: Difference Between JPA, Hibernate and Spring Data JPA

## Aim

To understand the differences between JPA, Hibernate, and Spring Data JPA, and learn how they simplify database operations in Java applications.

---

## What I Learned

During this hands-on, I learned that JPA, Hibernate, and Spring Data JPA are closely related but serve different purposes.

- **JPA (Java Persistence API)** is a specification that defines standard APIs for mapping Java objects to relational databases. It provides the rules for persistence but does not perform database operations by itself.

- **Hibernate** is an ORM framework that implements the JPA specification. It manages database operations such as inserting, updating, deleting, and retrieving records while converting Java objects into database tables.

- **Spring Data JPA** is a Spring Framework module built on top of JPA. It simplifies data access by providing repository interfaces and built-in CRUD operations, reducing the amount of boilerplate code.

---

## Hibernate Example

```java
public Integer addEmployee(Employee employee) {
    Session session = factory.openSession();
    Transaction transaction = null;
    Integer employeeId = null;

    try {
        transaction = session.beginTransaction();
        employeeId = (Integer) session.save(employee);
        transaction.commit();
    } catch (Exception e) {
        if (transaction != null) {
            transaction.rollback();
        }
        e.printStackTrace();
    } finally {
        session.close();
    }

    return employeeId;
}
```

### Observation

- Manual session management is required.
- Transactions must be handled explicitly.
- More boilerplate code is needed.

---

## Spring Data JPA Example

```java
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}

@Autowired
private EmployeeRepository employeeRepository;

@Transactional
public void addEmployee(Employee employee) {
    employeeRepository.save(employee);
}
```

### Observation

- No manual session handling.
- Transaction management is simplified.
- CRUD operations are available through `JpaRepository`.
- Cleaner and more maintainable code.

---

## Comparison

| JPA | Hibernate | Spring Data JPA |
|-----|-----------|-----------------|
| Specification | JPA Implementation | Spring module built on JPA |
| Defines persistence rules | Performs ORM operations | Simplifies database access |
| Uses EntityManager | Uses Session/EntityManager | Uses JpaRepository |
| Requires more coding | Moderate coding | Minimal boilerplate code |

---

## Conclusion

This hands-on helped me understand the relationship between JPA, Hibernate, and Spring Data JPA. JPA defines the persistence standard, Hibernate implements that standard, and Spring Data JPA simplifies development by providing repository-based database operations. Using Spring Data JPA results in cleaner, more maintainable, and more productive applications.