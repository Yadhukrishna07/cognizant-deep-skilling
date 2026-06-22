public class EcommerceSearch {

    public static int searchProduct(String[] products, String productName) {

        for (int i = 0; i < products.length; i++) {
            if (products[i].equalsIgnoreCase(productName)) {
                return i;
            }
        }

        return -1;
    }

    public static void main(String[] args) {

        String[] products = {
                "Laptop",
                "Mobile",
                "Keyboard",
                "Mouse",
                "Headphone"
        };

        String searchItem = "Keyboard";

        int index = searchProduct(products, searchItem);

        if (index != -1) {
            System.out.println("Product Found at Index: " + index);
        } else {
            System.out.println("Product Not Found");
        }
    }
}