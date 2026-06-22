public class FinancialForecast {

    public static double forecast(double amount, double rate, int years) {

        if (years == 0) {
            return amount;
        }

        return forecast(amount * (1 + rate), rate, years - 1);
    }

    public static void main(String[] args) {

        double initialAmount = 10000;
        double growthRate = 0.10; // 10%
        int years = 5;

        double futureValue = forecast(initialAmount, growthRate, years);

        System.out.printf("Future Value after %d years = %.2f%n",
                years, futureValue);
    }
}