public class Test2 {
    public static void main(String[]args){
        int[] all = new int[8];
        int i =0;
        int n = 10;
        while(n>0){
            all[i++] = n%2;
            n/=2;
        }
        for (i=7; i>=0; i--){
            System.out.print(all[i]);
        }
    }
}
