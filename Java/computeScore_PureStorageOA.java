import java.io.*;

static int compute_number_score(int number){
    int score = 0;
    if(number % 3 == 0)
        score += 4;
    String numStr = Integer.toString(number);
    int[] num = new int[numStr.length()];
    for(int i = 0; i < numStr.length(); i++){
        num[i] = numStr.charAt(i) - '0';
    }
    int numOfSevens = 0;
    int consecutiveTwos = 0;
    int evenDigits = 0;
    int sequenceLength = 1;
    for(int i = 0; i < num.length; i++){
        if(num[i] == 7)
            numOfSevens++;
        if(num[i] % 2 == 0)
            evenDigits++;
        if(num[i] == 2 && i + 1 != num.length && num[i + 1] == 2)
            consecutiveTwos++;
        if(i + 1 != num.length && num[i] == num[i + 1] + 1)
            sequenceLength++;
        else{
            score += Math.pow(sequenceLength, 2);
            sequenceLength = 1;
        }
    }
    score = score + (numOfSevens * 5) + (consecutiveTwos * 6) + (evenDigits * 3);
    return score;
}