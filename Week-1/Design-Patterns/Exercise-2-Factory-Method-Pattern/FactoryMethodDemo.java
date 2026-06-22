public class FactoryMethodDemo {

    interface Shape {
        void draw();
    }

    static class Circle implements Shape {
        public void draw() {
            System.out.println("Drawing Circle");
        }
    }

    static class Rectangle implements Shape {
        public void draw() {
            System.out.println("Drawing Rectangle");
        }
    }

    static class ShapeFactory {
        public Shape getShape(String shapeType) {
            if (shapeType.equalsIgnoreCase("Circle")) {
                return new Circle();
            } else if (shapeType.equalsIgnoreCase("Rectangle")) {
                return new Rectangle();
            }
            return null;
        }
    }

    public static void main(String[] args) {

        ShapeFactory factory = new ShapeFactory();

        Shape shape1 = factory.getShape("Circle");
        shape1.draw();

        Shape shape2 = factory.getShape("Rectangle");
        shape2.draw();
    }
}