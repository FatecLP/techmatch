# Java

## Bytecode
- Código intermediário gerado pelo compilador Java (.class)
- Independente de plataforma: executado pela JVM (Java Virtual Machine)
- Permite portabilidade: "escreva uma vez, execute em qualquer lugar"
- Mais seguro e otimizado do que código-fonte puro
- JVM interpreta ou compila (JIT) o bytecode em tempo de execução

## Garbage Collection (GC)
- Gerenciamento automático de memória na JVM
- Remove objetos não mais referenciados, liberando memória
- Evita vazamentos de memória e erros de ponteiro
- Algoritmos comuns: Mark and Sweep, Generational GC
- GC pode causar pausas na aplicação (pausas do GC)
- Desenvolvedor pode sugerir coleta com `System.gc()`, mas não forçar
