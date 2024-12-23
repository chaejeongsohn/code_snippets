### c로 작성된 add.c, add.h

1. 전처리(Preprocess)  
   gcc에서는 "-E" 옵션을 사용하여 소스 코드의 전처리 결과를 확인할 수 있습니다.

```
$ gcc -E add.c > add.i
$ cat add.i
```

2. 컴파일(Compile)  
   컴파일(Compile)은 C로 작성된 소스 코드를 어셈블리어로 번역하는 것입니다.  
   컴파일러는 코드를 번역할 때, 몇몇 조건을 만족하면 최적화 기술을 적용하여 효율적인 어셈블리 코드를 생성해줍니다. gcc에서는 "-O", "-O0", "-O1", "-O2", "-O3", "-Os", "-Ofast", "-Og" 등의 옵션을 사용하여 최적화를 적용할 수 있습니다.  
   "-S" 옵션을 이용하면 소스 코드를 어셈블리 코드로 컴파일할 수 있습니다.

```
$ gcc -S add.i -o add.S
$ cat add.S
```

3. 어셈블(Assemble)  
   어셈블(Assemble)은 컴파일로 생성된 어셈블리어 코드를 ELF형식의 목적 파일(Object file)로 변환하는 과정입니다. 여기서 ELF는 리눅스의 실행파일 형식입니다. 윈도우에서 어셈블한다면 목적 파일은 PE형식을 갖게 됩니다.  
   gcc의 "-c" 옵션을 통해 add.S를 목적 파일로 변환하고, 결과로 나온 파일을 16진수로 출력한 것입니다.

```
$ gcc -c add.S -o add.o
$ cat add.o

$ hexdump -C add.o
```

4. 링크(Link)  
   링크(Link)는 여러 목적 파일들을 연결하여 실행 가능한 바이너리로 만드는 과정입니다.  
   add.o를 링크하는 명령어입니다. 링크 과정에서 링커는 main함수를 찾는데, add의 소스 코드에는 main함수의 정의가 없으므로 에러가 발생할 수 있습니다. 이를 방지하기 위해 "--unresolved-symbols"를 컴파일 옵션에 추가했습니다.

```
$ gcc add.o -o add -Xlinker --unresolved-symbols=ignore-in-object-files
$ file add
```

### Disassemble

바이너리 파일을 디스어셈블하여 어셈블리어 코드를 확인할 수 있습니다.

```
$ gcc -o hello-world hello-world.c  # 컴파일
$ objdump -d ./hello-world -M intel  # 디스어셈블
```

### Decompiler

디컴파일러는 바이너리 파일을 소스 코드로 변환하는 프로그램입니다.  
디스어셈블러를 사용하는 것 보다 압도적으로 분석 효율을 높여주기 때문에, 디컴파일러를 사용할 수 있다면 반드시 디컴파일러를 사용하는 것이 유리합니다.

```
$ gcc -o hello-world hello-world.c
$ c++filt hello-world
```
