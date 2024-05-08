# -*- coding: utf-8 -*-
import re
class InfoCrawlerBasic:
    # .表示尽可能少匹配
    #怎么去掉多抓取的内容，stirp(1)? 怎么同时和需要复杂筛选def的值同时使用？
    #营养不良和贫血不对
    def __init__(self):
        self.info = {}
        self.patterns = {
            "住院号": r"住院号：(.*?)(?=&nbsp;)",
            "性别": r"性别：(.*?)(?=<br>)",  # 任意字符，到<br>为止
            "年龄": r"年龄：(.*?)(?=<br>)",
            "民族": r"民族：(.*?)(?=<br>)",
            "户籍类型": "",
            "体重": "",
            "身高": "",
            "孕次": r"孕(\d+)",
            "产次": r"产(\d+)",
            "孕周": r"(足月)",
            "早产史": r"(足月)",
            "出生体重":r"出生体重(.*?)(?=<br>)",
            "出生缺陷":r"出生时(.*?)(?=，|。)",
            "营养不良":r"营养不良",
            "贫血":r"贫血",
            "既往病史":r"既往史：平素(.*?)否认",
        }

    def progress_pregnancy(self,match):
        value = match.group(1).strip()
        if value == '足月':
            self.info["孕周"] = "38"
            self.info["早产史"] = "无"
        else:
            pregnancy_week = value[:-1]
            self.info["孕周"] = pregnancy_week
            self.info["早产史"] = "无"

    def progress_birth_defect(self,match):
        value = match.group(1).strip()
        if value == "无窒息、产伤史":
            self.info["出生缺陷"] = "无"
        else:
            birth_defect = value[:-1]
            self.info["出生缺陷"] = birth_defect

    def progress_past_medical_history(self,match):
        history = match.group(1)
        pattern_disease = re.compile(r'“(.*?)”')
        diseases = pattern_disease.findall(history)
        self.info["既往病史"] = '，'.join([disease.strip() for disease in diseases])

    def extract_info(self,key,pattern,text):
        match = re.search(pattern,text)
        if match:
            if key == "孕周" or key == "早产史":
                self.progress_pregnancy(match)
            elif key == "出生缺陷":
                self.progress_birth_defect(match)

            elif key == "营养不良" or key == "贫血": #为什么一个可以另一个是空值
                if match.group(0).strip() == key:
                    self.info[key] = "是"
                else:
                    self.info[key] = "否"
            elif key == "既往病史":
                self.progress_past_medical_history(match)
            else:
                self.info[key] = match.group(0).strip()
    def extract_all_info(self,text):
        for key,pattern in self.patterns.items(): #todo 什么是items()方法？
            self.extract_info(key,pattern, text)
        for key in self.patterns.keys():
            if key not in self.info:
                self.info[key]=""
        return self.info


text = '''
    <h3 style="font-size: 14px"></h3>
    <h3>住院号：2019120604152 &nbsp;</h3>
    <h3 style="font-size: 14px"></h3>
    <h3>住院科室：儿科 &nbsp;</h3>
    <div style="border-bottom: solid 1px #000"><h3>入院记录</h3><p>入院记录<br>地址：浙江萧山<br>性别：女性<br>出生日期：2019年01月30
    日<br>年龄：10个月<br>入院时间：2019年12月06日11时08分<br>职业：散居儿童<br>记录时间：2019年12月06日11时31分<br>民族：汉族<br>病史陈述者：父母<br>婚姻：未婚联系<br
    >地址：浙江杭州萧山临浦金榈湾15-2-601<br><br>主诉：发热2天，抽搐1次。<br><br>现病史：患儿2天前无明显诱因下出现发热，体温最高39.9
    ℃，偶有咳嗽，无咳痰，伴流涕，无气喘气促，首次就诊于：我院，予“奥司他韦颗粒”口服1天，11小时前出现抽搐1次。就诊于第三人民医院，予“地塞米松针”静滴1天（12.05），为进一步治疗，拟“高热惊厥，急性上呼吸道感染”收住入院。需要同治疾病，持续时间，用药情况，一般控制情况入院时用药：否认。<br><br>既往史：平素体质一般，2019-11-24至2019-11-28因“急性上呼吸道感染”在我院住院治疗，2019-12-3至2019-12-13因“急性支气管肺炎”在我院住院治疗，否认“心血管疾病史”，否认“肾病史”，预防接种史按当地社会进行。<br><br>个人史：<br><br>出生史：孕2产2，足月顺产，出生时有窒息、产伤史，出生体重3150g<br><br>喂养史：母乳喂养至3月，6个月开始添加辅食，无厌食偏食。生长发育史：3个月会抬头，6个月会坐，8个月会爬,现不会走，否认不良生活习惯史。<br><br>家族史：父亲体健，母亲体健，有兄弟姐妹：一姐姐，体健，否认家族性遗传病、精神病、传染病或类似的病史。</p></div>
'''
extractor = InfoCrawlerBasic()
result = extractor.extract_all_info(text)
print(result)