# -*- coding: utf-8 -*-
import re
class InfoCrawlerVirus:
    def __init__(self):
        self.info = {
            "轮状病毒检测方法": "",
            "轮状病毒检测日期": "",
            "轮状病毒检测标本": "",
            "轮状病毒检测结果": "",
            "轮状病毒检测结果阳性具体值": "",
        }

    def extract_virus_info(self, virus_name, text):
        # 修改正则表达式以精确匹配“轮状病毒”后的检测结果，忽略其他干扰信息
        print("---"+virus_name+"---")
        #用f-string写正则，确保virus_name能被正确导入
        pattern = re.compile(r'(\d{4}年\d{1,2}月\d{1,2}日).*?辅助检查结果：.*?({}\s*：((阳性)\((\+*)\)|阴性))'.format(virus_name),re.DOTALL)

        match = re.search(pattern, text)
        if match:
            print(match.group(0))
            # time = match.group(1)
            # isPositive = match.group(4)
            # result = match.group(5)
            # print("检测日期: " + time)
            # print("检测结果：" + isPositive)
            # print("轮状病毒阳性具体值: " + result)
        else:
            print("没有{}检测结果".format(virus_name))


    def extract_all_info(self, text):
        viruses = {
            "轮状病毒",
            "呼吸道病毒",
            "札如病毒",
            "诺如病毒",
            "星状病毒",
        }
        for virus in viruses:
            self.extract_virus_info(virus, text)

#可以看出院记录的辅助检查，也可以看病程记录，前者没有检验日期，后者需要读取所有的病程文本才能够提取
text = '''
    <h4 style="margin: 14px 0">----- 病程2 -----</h4>
    <div style="padding:10px 0">
        2019年12月17日10时38分             王岚首次副主任代主治医师查房记录
        患儿入院后体温最高37.6℃，具体热型不详。辅助检查结果：粪便常规正常,轮状病毒：隐血 ：阳性(+)，轮状病毒 ：阳性(+)，大便红细胞 ：2-4/HP；（2019.12.14浙江省儿童医院门诊）呼吸道病毒：呼吸道和胞病毒、流感病毒AB、腺病毒阴性。
        王岚副主任医师在详细了解病情及重点体格检查后认为：目前诊断：1.轮状病毒肠炎；2.轻度脱水；3.代谢性酸中毒；4.低钾血症 。鉴别诊断：1.细菌性痢疾：患儿发热、呕吐、腹泻，需警惕，但是大便无粘液脓血，无不洁饮食病史，无该病接触史，故目前依据不足，待大便培养协诊。
                                                                    医师签名: 陈幼萍
    </div>
    <div style="margin: 14px 0">----- 结束 -----</div>
'''
extractor = InfoCrawlerVirus()
result = extractor.extract_all_info(text)
print(result)