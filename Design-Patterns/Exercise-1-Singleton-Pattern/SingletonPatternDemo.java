class Singleton {

    // Create a static variable to hold the single instance
    private static Singleton instance;

    // Private constructor prevents object creation from outside
    private Singleton() {
        System.out.println("Singleton Object Created");
    }

    // Method to get the single instance
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}

public class SingletonPatternDemo {

    public static void main(String[] args) {

        Singleton obj1 = Singleton.getInstance();
        Singleton obj2 = Singleton.getInstance();

        if (obj1 == obj2) {
            System.out.println("Both objects are the same instance.");
        } else {
            System.out.println("Different instances created.");
        }
    }
}