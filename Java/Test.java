public class Test{
    public static void main(String args[]){
        int a = 12;
        int b= 5;
        int sum = 2;
        b*=a/=4;
        System.out.println("b="+b);
        sum += ++a * b-- /4;
        System.out.printf("sum = %d", sum);

    }
}