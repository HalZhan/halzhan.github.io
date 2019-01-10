---
title: leetcode-514-freedom-trail
abbrlink: c5ca0b86
date: 2018-11-08 11:41:45
tags:
 - Leetcode
categories:
 - Algorithm
 - Leetcode
---
## 原题描述

视频游戏“辐射4”中，任务“通向自由”要求玩家到达名为“Freedom Trail Ring”的金属表盘，并使用表盘拼写特定关键词才能开门。

给定一个字符串 ring，表示刻在外环上的编码；给定另一个字符串 key，表示需要拼写的关键词。您需要算出能够拼写关键词中所有字符的最少步数。

最初，ring 的第一个字符与12:00方向对齐。您需要顺时针或逆时针旋转 ring 以使 key 的一个字符在 12:00 方向对齐，然后按下中心按钮，以此逐个拼写完 key 中的所有字符。

旋转 ring 拼出 key 字符 key[i] 的阶段中：

您可以将 ring 顺时针或逆时针旋转一个位置，计为1步。旋转的最终目的是将字符串 ring 的一个字符与 12:00 方向对齐，并且这个字符必须等于字符 key[i] 。
如果字符 key[i] 已经对齐到12:00方向，您需要按下中心按钮进行拼写，这也将算作 1 步。按完之后，您可以开始拼写 key 的下一个字符（下一阶段）, 直至完成所有拼写。

**示例：**
<div align=center>
{% img //assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/ring.jpg '300' '300' %}
</div>

```
输入: ring = "godding", key = "gd"
输出: 4
解释:
 对于 key 的第一个字符 'g'，已经在正确的位置, 我们只需要1步来拼写这个字符。 
 对于 key 的第二个字符 'd'，我们需要逆时针旋转 ring "godding" 2步使它变成 "ddinggo"。
 当然, 我们还需要1步进行拼写。
 因此最终的输出是 4。
```

**提示：**
- ring 和 key 的字符串长度取值范围均为 1 至 100；
- 两个字符串中都只有小写字符，并且均可能存在重复字符；
- 字符串 key 一定可以由字符串 ring 旋转拼出。

## 思路解析
按照题目的意思，可以分析出一个大致的求解过程：

<div align=center>
{% asset_img progress.png 思路流程图 %}
</div>

实际上，对于每一次拼写，表盘的调整至多会有两种可能，也就是向左转动或向右转动。但是，由于前一次拼写完成时，表盘的位置会影响下一次拼写需要转动的次数，因而需要求解出所有的可能，然后计算出最小的步骤数。

这道题如果直接使用深度优先遍历的话，很容易就会超时，因为存在大量的重复步骤。比如，给定字符串 `ring` 为 `godding`，我们拼写 `idg` ，计算由字符串 `ring` 拼写 `i` 的步骤数时需要考虑 `ring` 拼写 `d` 以及 `ring` 拼写 `g` 的步骤数，然后计算字符串 `ring` 拼写 `d` 的步骤数时又需要考虑 `ring` 拼写 `g` 的步骤数，所以这里 `ring` 拼写 `g` 的步骤数计算实际上是重复了的，因而我们需要设置一个缓存 `CACHE` 来记录这个步骤数。

`CACHE` 是一个二维数组 `Array[i][j]`，其中 `i` 表示 `ring` 中第 `i` 个字符处于 `12` 点钟位置，`j` 表示所要拼写的字符在 `key` 中的索引，数组中 `Array[i][j]` 则表示当前字符串 `ring` 拼写字符 `key[j]` 时的最小步骤数。所以一个优化比较好的方法如下：

```js
const findRotateSteps = function (ring, key) {
    const
        RING_LEGNTH = ring.length,
        KEY_LENGTH = key.length,
        CACHE = new Array(RING_LEGNTH).fill(null).map(() => new Array(KEY_LENGTH).fill(null));

    const findLeft = function (beginIdx = 0, kIdx) {
        let i = beginIdx + 1;
        do {
            i--;
            if (i < 0) {
                i += RING_LEGNTH;
            }
        }
        while (ring[i] != key[kIdx])
        return i;
    }

    const findRight = function (beginIdx = 0, kIdx) {
        let j = beginIdx - 1;
        do {
            j++;
            j %= RING_LEGNTH;
        }
        while (ring[j] != key[kIdx])
        return j;
    }

    const rotate = function (rIdx, kIdx) {
        if (kIdx >= KEY_LENGTH) {
            return 0;
        }
        if (CACHE[rIdx][kIdx] != null) {
            return CACHE[rIdx][kIdx];
        }
        let i = findLeft(rIdx, kIdx),
            j = findRight(rIdx, kIdx);

        let distI = rIdx - i, distJ = j - rIdx;
        while (distI < 0) {
            distI += RING_LEGNTH;
        }
        while (distJ < 0) {
            distJ += RING_LEGNTH;
        }
        let countI = distI + 1 + rotate(i, kIdx + 1),
            countJ = distJ + 1 + rotate(j, kIdx + 1);

        return CACHE[rIdx][kIdx] = Math.min(countI, countJ);
    }

    return rotate(0, 0);
};
```