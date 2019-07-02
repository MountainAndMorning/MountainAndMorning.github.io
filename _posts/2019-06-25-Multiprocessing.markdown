---
layout: post
title: Multiprocessing 库
date: 2019-06-25
mathjax: true
---

## 简介

Multiprocessing库对我的折磨可谓由来已久，感觉没理清楚，每次都临时找资料查怎么用，效率很低，这次想系统性整理下我所需要了解的相关内容。目前，我对Mutiprocessing库的使用场景主要有两个，一当然就是对某些函数的并行，二则是利用子进程执行某些内存资源消耗大的任务，使得在任务完成时通过关闭子进程及时释放内存资源。



## Process

通过实例化`multiprocessing.Process`生成子进程，是最简单的使用场景之一。

```python
from multiprocessing import Process 

def f(name):
	print('hello', name) if __name__ == '__main__':

p = Process(target=f, args=('bob',)) 
p.start() 
p.join()
```

如上，实例化一个子进程，`target`参数为该子进程所要运行的函数，`args`是该函数运行对应的参数。

下面详细讲解Process类。

```python
class multiprocessing.Process(group=None, target=None, name=None, args=(), 
                              kwargs={}, daemon=None)
```

* `group`参数是为了与thread库API相统一而来的，所以没有实际用处
* `target`为子进程要运行的函数
* `name`为子进程的名字
* `args`, `kwargs`为`target`的传入参数
* `daemon`为True时，父进程结束时会终结其所有子进程

##### `start()`

当我们实例化`Process`得到p时，我们还没有在操作系统中创建一个真正的新进程。调用`p.start()`后会在操作系统中创建一个新进程，并运行`p.run()`. 不过需要注意的是，我们虽然创建了新进程，也提供了新进程需要执行的函数，但新进程的执行情况则是由操作系统去调度的。如果当前系统任务量小，可能立刻就能开始执行新进程，如果当前系统任务量大，则可能等待一会儿才能分得系统资源来执行新进程。

##### `run()`

在新进程中执行`target`参数提供的函数。在使用Process类时一般有两种用法，仪式直接实例化`Process`，通过`target`参数提供的函数完成所需任务，另一种方法则是直接继承`Process`类，然后直接重写`run`函数来明确子进程要完成的工作。

```python
import multiprocessing
import os
class MyProcess(multiprocessing.Process):
  	def run(self):
    	print(f"The pid of this process is {os.getpid()}")

processes = []
for i in range(5):
  	p = MyProcess()
  	processes.append(p)
  	p.start()
for p in processes:
  	p.join()
```
输出结果：
```
The pid of this process is 9349
The pid of this process is 9350
The pid of this process is 9351
The pid of this process is 9352
The pid of this process is 9353
```

##### join(timeout=None)

`join`必须运行在`start`后，调用join后，主进程需要等待调用`join`的对象对应的子进程完成才能继续运行，如果给了timeout，则主进程等待timeout时间后再继续运行。

##### `terminate()`

手动终止进程，不建议用，因为不知道进程终止时处于的状态。

##### `close()`

关闭进程实例，释放其占用的资源，必须用于`join()`和`terminate()`之后。

#### 如何从Process中得到返回结果

一个直接的想法可能是用一个全局列表来记录每个Process的结果。

```python
from multiprocessing import Process

lis = []

def foo(i):
    lis.append(i) 
    print("This is Process ", i," and lis is ", lis, " and lis.address is", id(lis))
if __name__ == '__main__':
  	processes = []
  	for i in range(3):
  		p = Process(target=foo, args=(i,)) 
    	processes.append(p)
    	p.start()
	for p in processes:
    	p.join()
  	print("The end of list_1:", lis)
```
运行结果：
```
This is Process  0  and lis is  [0]  and lis.address is 30705874440
This is Process  1  and lis is  [1]  and lis.address is 30705874440
This is Process  2  and lis is  [2]  and lis.address is 30705874440
The end of list_1: []
```

可见，全局字典并未有我们期望的行为，这是由于Process之所以能绕过GIL就是因为每个进程都有自己独立的内存空间，所以每个进程接受的列表都是全局列表的拷贝，为了解决这一问题，必须使用multiprocessing提供的工具来实现进程间的数据传输。例如可以使用`Queue`来获得Process的返回值。

```python
from multiprocessing import Queue 
from random import random

output = Queue()


def rand_num(output):
    output.put(random())

processes = [mp.Process(target=rand_num, args=(output,)) for x in range(4)]

for p in processes:
    p.start()

for p in processes:
    p.join()

results = [output.get() for p in processes]

print(results)
```

得到结果：

```
[0.7699335480230789, 0.4768711502367038, 0.5705339886524433, 0.11201257701913991]
```

更多关于multiprocessing中数据通信的内容可以参看[这篇博客](http://www.liujiangblog.com/course/python/82)。

## Pool

进程池可以方便地管理多个工作进程。

```python
class multiprocessing.pool.Pool(processes=None, maxtasksperchild=None)
```

进程池的初始化还包括其它参数，这里只关注这两个参数。

* `processes`为进程池中的进程数量，如果为`None`则使用`os.cpu_count()`得到的结果
* `maxtasksperchild`为每个进程完成的**task**数，当`maxtasksperchild=1`时，则每个进程每完成一个**task**就会退出，然后`Pool`会创建新的进程，使得进程池中进程数维持在`processes`这么多，通过这种方式可以使进程池中每个进程完成一个**task**后及时释放资源，这在利用multiprocessing释放占用大量内存的任务时很有用。

当使用Pool时要考虑[四件事情](https://stackoverflow.com/questions/35908987/multiprocessing-map-vs-map-async)，多参数、并发、阻断、顺序。针对不同情况，有适合的方法可供选择：

|      |   多参数   |   并发   |   阻断   |   顺序   | 返回 |
| ---- | :--: | :--: | :--: | :--: | ---: |
|   apply   | 是 | 否 | 是 | 是 | 函数返回值 |
|   apply_async   | 是 | 是 | 否 | 否 | result对象 |
|   map   | 否 | 是 | 是 | 是 | 函数返回值 |
|   map_async   | 否 | 是 | 否 | 是 | result对象 |
|   startmap   | 是 | 是 | 是 | 是 | 函数返回值 |
|   startmap_async   | 是 | 是 | 否 | 是 | result对象 |



下面分别简单讲讲每种方法怎么使用，示例可参考这篇[博客](https://feelncut.com/2018/05/14/150.html)

##### `apply(func, args=(), kwds={})`

```python
import multiprocessing
import time
def func(msg):
    print('msg0: ', msg, flush=True)
    time.sleep(1)
    print('msg1: ', msg, flush=True)
    return 'func_return: %s' % msg

# apply
print('\n--------apply------------', flush=True)
pool = multiprocessing.Pool(processes=3)
results = []
for i in range(3):
    msg = 'hello world %d' % i
    result = pool.apply(func, (msg,))
    results.append(result)
print('apply: 阻塞', flush=True)  # 执行完func才执行该句
pool.close()
pool.join()  # join语句要放在close之后
print(results, flush=True)
```

运行结果：

```
--------apply------------
msg0:  hello world 0
msg1:  hello world 0
msg0:  hello world 1
msg1:  hello world 1
msg0:  hello world 2
msg1:  hello world 2
apply: 阻塞
['func_return: hello world 0', 'func_return: hello world 1', 'func_return: hello world 2']
```



`apply`支持多参数，`pool.apply`调用后，调用`pool.apply`的进程会被阻断，直到`pool.apply`要完成的任务结束为止，所以同一时刻只有一个子进程在完成任务，因此`apply`是非并发的。

##### `apply_async(func, args=(), kwds={}, callback=None, erroe_callback=None)`

```python
import multiprocessing
import time
def func(msg):
    print('msg0: ', msg, flush=True)
    time.sleep(1)
    print('msg1: ', msg, flush=True)
    return 'func_return: %s' % msg

# apply_async
print('\n--------apply_async------------', flush=True)
pool = multiprocessing.Pool(processes=3)
results = []
for i in range(3):
    msg = 'hello world %d' % i
    result = pool.apply_async(func, (msg, ))
    results.append(result)
print('apply_async: 不阻塞', flush=True)
for i in results:
    i.wait()  # 等待进程函数执行完毕
for i in results:
    if i.ready():  # 进程函数是否已经启动了
        if i.successful():  # 进程函数是否执行成功
            print(i.get(), flush=True)  # 进程函数返回值

pool.close()
pool.join()
```

运行结果：

```
--------apply_async------------
msg0:  hello world 1
msg0:  hello world 2
msg0:  hello world 0
apply_async: 不阻塞
msg1:  hello world 0
msg1:  hello world 2
msg1:  hello world 1
func_return: hello world 0
func_return: hello world 1
func_return: hello world 2
```

`apply_async`支持多参数，`pool.apply_async`调用后，调用`pool.apply_async`的进程不会被阻断，所以可以不断通过`for`循环添加新任务实现并发，当有进程池中有闲置进程时，新添加的任务就会被发送到子进程中进行计算，否则就必须等待，直至有空余进程为止。进程生命周期由实例化`Pool`时的`maxtasksperchild`参数控制。`apply_async`返回一个`AsyncResult`对象，调用该对象的`get`方法可以得到任务的返回值，`get`方法会阻断父进程的执行，直到任务获得返回值，所以要实现并发，应该将所有任务通过`apply_async`启动后再调用`get`方法。事实上，从源码中可以发现`apply(func, args, kwds)`即为`apply_async(func, args, kwds).get()`. 在实验这里`get()`的阻塞作用时，总是发现不对劲，后来发现原来是`print`惹的祸，记住最与这种要通过`print`结果先后顺序来理解函数行为的情形，一定要在`print`函数中加`flush=Ture`参数。

##### `map(func, iterable, chunksize=None)`

```python
import multiprocessing
import time
def func(msg):
    print('msg0: ', msg, flush=True)
    time.sleep(1)
    print('msg1: ', msg, flush=True)
    return 'func_return: %s' % msg

# map
print('\n--------map------------')
args = [1, 2, 4]
pool = multiprocessing.Pool(processes=3)
return_data = pool.map(func, args)
print('阻塞')  # 执行完func才执行该句
pool.close()
pool.join()  # join语句要放在close之后
print(return_data)
```

运行结果：

```
--------map------------
msg0:  2
msg0:  1
msg0:  4
msg1:  1
msg1:  4
msg1:  2
阻塞
['func_return: 1', 'func_return: 2', 'func_return: 4']
```

`map`不支持多参数，会阻塞父进程运行，直到计算出所有结果，可直接得到函数返回值且是顺序的。`len(iterable)`即为单位任务数，所谓单位任务，就是`map`中涉及的最小工作量，也即运行`func`一次，可称为[taskel](https://stackoverflow.com/questions/53751050/python-multiprocessing-understanding-logic-behind-chunksize/54032744#54032744)，`iterable`中每个元素都是要传入`func`的参数，所以参数数即taskel数。 `map`在往进程池中的进程提交工作量时不是以taskel为单位的，而是以**task**为单位：

> A **task** consists of `chunksize` **taskels**

所以，`chunksize`即用于指定每个**task**的大小。注意这里所说的**task**即为`maxtasksperchild`参数中提及的**task**. 因此，我们要想利用`pool.map`来执行某些内存消耗大的任务以期其执行完后能及时释放内存资源，就必须关注`Pool`实例化时的`maxtasksperchild`参数和`map`中的`chunksize`参数。

##### `map_async(func, iterable, chunksize=None, callback=None, error_callback=None)`

```python
import multiprocessing
import time
def func(msg):
    print('msg0: ', msg, flush=True)
    time.sleep(1)
    print('msg1: ', msg, flush=True)
    return 'func_return: %s' % msg

# map_async
print('\n--------map_async------------')
args = [1, 2, 4]
pool = multiprocessing.Pool(processes=3)
result = pool.map_async(func, args)
print('ready: ', result.ready())
print('不阻塞')
result.wait()  # 等待所有进程函数执行完毕
if result.ready():  # 进程函数是否已经启动了
    if result.successful():  # 进程函数是否执行成功
        print(result.get())  # 进程函数返回值
```

运行结果：

```
--------map_async------------
msg0:  1
msg0:  2
msg0:  4
ready:  False
不阻塞
msg1:  1
msg1:  2
msg1:  4
['func_return: 1', 'func_return: 2', 'func_return: 4']
```

`map_async`不支持多参数，不阻塞父进程运行，返回`AsyncResult`对象，调用其`get`方法即可得到与`iterable`相对应的结果列表。事实上，`map(func, iterable, chunksize)`相当于`map_async(func, iterable, chunksize).get()`. 

`starmap`和`starmap_async`分别对应是`map`和`map_async`的多参数版本。

到此，再来回顾下`pool = Pool(processes, maxtasksperchild)`的运作方式，`pool`维持数量为`processes`的进程池，其中每个进程在执行`maxtasksperchild`个任务后就退出，并由新进程替代。`apply_async`和`map_async`不断向进程提交task，`apply_async`提交的task由一个taskel组成，`map_async`提交的task由`chunksize`个taskel组成。当有空余进程时task立即可以进入执行状态，否则则需等待某进程完成其上一个task后空余出来。另一方面，进程进入执行状态后并不一定就在CPU上执行，计算机中每时都有大量进程，具体哪个进程占用CPU资源依赖于操作系统的调度。所以可能出现`pool`有大量进程，且每个进程的task也很繁重，但在计算机资源管理器中却发现`pool`中的进程CPU占用率很低的情形。































