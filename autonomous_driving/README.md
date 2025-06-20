# 量子化誤差と不均衡ラベルを学習するモデル

こちらは、ラズベリーパイカー上で自動走行に関する実験を行い、不均衡なラベル分布と量子化について検証したものです。


# 背景
既存のモデルでは、データの不均衡が原因で、少数派クラスのデータが多数派クラスに誤分類されやすいという課題があります。
例えば、コースの左回りデータを取得した場合、直進 > 左 > 右の順でデータ量が多くなるため、右方向の画像が直進に誤分類されやすくなります。
![image](https://github.com/user-attachments/assets/3f486db8-d235-4a46-8117-15aa69e25bc9)


また、ラズベリーパイ上で自動走行モデルを実装する際には、モデルの軽量化（ここでは量子化）が必須となります。しかし、そうしたモデル軽量化技法によって更なる精度劣化が生じる問題があります。

![image](https://github.com/user-attachments/assets/7957d0d0-33d5-4cc0-9697-1fab0ad74196)


そこでこの課外授業ではでは、モデルが誤分類しやすいラベルに対して学習コストを適応的に与え、データの不均衡に対する誤分類と量子化誤差の影響を低減し、自動運転モデルの信頼性向上を目指しました。

# 方法

コースを反時計回りに走行してデータ収集を行ったため、右方向のサンプルが著しく不足しています。

```
Train データセットのクラスごとのデータ数:
クラス "left" のデータ数: 3242サンプル
クラス "right" のデータ数: 97サンプル
クラス "straight" のデータ数: 1068サンプル

Validation データセットのクラスごとのデータ数:
クラス "left" のデータ数: 219サンプル
クラス "right" のデータ数: 8サンプル
クラス "straight" のデータ数: 717サンプル

Test データセットのクラスごとのデータ数:
クラス "left" のデータ数: 370サンプル
クラス "right" のデータ数: 52サンプル
クラス "straight" のデータ数: 245サンプル
```
これに対して私は、量子化認識学習モデルと、量子化と不均一ラベルに対する誤分類コストを同時に学ばせる、つまり右であるにもかかわらずまっすぐと誤分類することがコストと考え、
以下の学習手法を使ったモデルを学習させて比較しました。
1. 量子化認識学習モデル (既存手法)

2. 量子化と不均衡ラベル誤分類コストを同時に学習するモデル (提案手法)

各モデルは100エポック、オプティマイザーはSGD, lr=0.001, momentum = 0.9, nestrov = True, weigth_decay = 5e-4で学習させます。
より、主張を強固なものとするためモデルは、3つ作りました。
各モデルは、以下のような構造を使います。

![image](https://github.com/user-attachments/assets/41b514cc-c60f-4d1c-a7e0-a1cea2cd2c92)


![image](https://github.com/user-attachments/assets/c6a0d9e7-056e-4917-b811-36f2aae20fd0)


# 結果
以下が実験結果です。


![image](https://github.com/user-attachments/assets/75dd3d7d-9d65-48c4-900f-cfcbcacc3aa0)

![image](https://github.com/user-attachments/assets/0e087dc6-4f3e-475c-bc67-6cbe89cadf16)

![image](https://github.com/user-attachments/assets/bf2aa78f-2f98-42d1-bb1b-f63adbf9bdcc)

予想に反し、モデル1およびモデル2では、右ラベルが従来の量子化認識学習モデルよりもマジョリティクラス（直進）に分類されやすくなるという結果が得られました。
しかしながら、全体的な精度は従来の量子化認識学習モデルより向上する結果が得られました。

この結果の要因として、以下の2点が考えられます。

Testデータのrightクラスのサンプル数が極端に少なく、マジョリティクラスに分類されやすかったこと

Testデータのrightクラスに、直進ラベルに似た画像が混入していたこと

精度が上がったことから学習手法が学習に対して、なんらかのヒントを与えることで、
モデルの汎化性能が向上したのではないかと考え、モデルIを用いてコース上で定規で固定した、データセットの少ない右方向からスタートし、各モデルでのコースアウト回数を調べました。

https://github.com/user-attachments/assets/5e9aa4cf-3ac1-4141-ab12-2e034185898d


その結果、学習を改善したモデルは、従来のモデルよりもコースアウト回数が2回分少ないという結果が得られました。

私はこの課外授業でフレームワークを使いこなすだけでなくより、実際に自分で学習方法を考えながら実装する経験を得ることが出来ました。
この経験は現在の研究に対する姿勢にも大いに役に立っております。
# 課題
今回の課外授業では、こちらで発表の期限がきてしまいましたが、もしさらに期間があれば、

1. テストデータに対する右の誤認識をまっすぐと誤認する場合の画像の確認
2. ほかのモデルアーキテクチャに効果があるか?
3. ほかの不均一データセットに対して同様の効果があるか

について検証したいと考えています。
