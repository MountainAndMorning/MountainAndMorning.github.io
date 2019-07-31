---
layout: post
title: tensorboardX
date: 2019-07-19
mathjax: true
tags:
    - python
	- 可视化
---

## 简介

利用tensorboardX可以方便地记录Pytorch运行时的某些信息，这些信息可以通过tensorboard可视化。

## 安装

tensorboardX本质上是向tensorflow套件中的tensorboard发送信息并可视化的，所以需要先安装tensorboard，anaconda上有编译好的tensorflow，安装时会将tensorboard一并安装，所以就选择这种方式来安装。

```bash
conda install -c conda-forge tensorflow
```

```bash
conda install -c conda-forge tensorboardX
```

## 使用

tensorboardX通过`SummaryWriter`的实例的`add_{something}({tag name}, {object}, {iteration number})`方法将信息记录在指定位置，再用tensorboard读取制定位置的这些信息并将其可视化。所以第一步是实例化一个`SummaryWriter`对象。

```python
class tensorboardX.SummaryWriter(logdir=None, comment='', purge_step=None, max_queue=10, flush_secs=120, filename_suffix='', write_to_disk=True, log_dir=None, **kwargs)
```
* **`logir`**(string)指定所记录的信息存放的位置，默认为在当前Python工作路径（可通过`import os; os.getcwd`获得）搜索一个runs文件夹，若没有则新建一个，并在其中创建`{当前时间}_{用户名}`的文件夹，用于存储该`SummaryWriter`实例记录的所有信息。
* **`comment`**(string)当`logir=None`时，`comment`传入的参数会附于默认的用于存储`SummaryWriter`实例记录信息的文件夹的文件名后，即`{当前时间}_{用户名}{comment}`

```python
from tensorboardX import SummaryWriter

writer0 = SummaryWriter()
writer1 = SummaryWriter('runs/exp-1')
writer2 = SummaryWriter(comment='3x learning rate')
```

将上述代码保存于try_tensorboardX文件夹的try.py文件中，可以查看这段代码运行前后的情况：

```bash
iridiums-MacBook-Pro-2:try_tensorboardX iridium$ pwd
/Users/iridium/Documents/try_tensorboardX
iridiums-MacBook-Pro-2:try_tensorboardX iridium$ ls
try.py
iridiums-MacBook-Pro-2:try_tensorboardX iridium$ python /Users/iridium/Documents/try_tensorboardX/try.py
iridiums-MacBook-Pro-2:try_tensorboardX iridium$ ls
runs	try.py
iridiums-MacBook-Pro-2:try_tensorboardX iridium$ cd runs/
iridiums-MacBook-Pro-2:runs iridium$ ls
Jul21_11-39-47_iridiums-MacBook-Pro-2.local
Jul21_11-39-47_iridiums-MacBook-Pro-2.local3x learning rate
exp-1
iridiums-MacBook-Pro-2:runs iridium$ 
```

实例化`SummaryWriter`得到writer后就可以利用其`add_{something}({tag name}, {object}, {iteration number})`记录对应信息，例如可以使用`writer.add_image`方法记录图像数据、利用`writer.add_scale`方法记录标量数据。

```python
add_image(tag, img_tensor, global_step=None, walltime=None, dataformats='CHW')
```
* **`tag`**(string)数据标识，可以理解为所要记录的图像对象的名字，每个图像对象在不同步骤（第几步由`gloabl_step`确定）有对应的数据，可以通过`tag`来确定要记录数据的图像对象

* **`img_tensor`**(torch.Tensor, numpy.array)一个uint8或者float的张量，其形为(channel, height, width)其中channel为1,3,4, 当数据类型为uint8时其数值应该为[0,255]中的整数，当数据类型为float时其数值应该在[0,1]之间

    ```python
    from tensorboardX import SummaryWriter
    import numpy as np
    
    img = np.zeros((3, 100, 100))
    writer = SummaryWriter()
    writer.add_image('my_image', img, 0)
    
    writer.close()
    ```

    






























