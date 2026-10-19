import { DocumentType, ExamType, GradeLevel } from "@/types";

export interface RealDocumentResource {
  id: string;
  title: string;
  description: string;
  grade: GradeLevel;
  subjectSlug: string;
  chapter: string;
  type: DocumentType;
  fileSize: string;
  pages: number;
  views: number;
  downloads: number;
  rating: number;
  author: string;
  sourceName: string;
  sourceUrl: string;
  bookSeries: "Kết nối tri thức" | "Chân trời sáng tạo" | "Cánh diều" | "Chung GDPT 2018";
  year: number;
  fullContentMarkdown: string;
}

export interface RealExamResource {
  id: string;
  title: string;
  grade: GradeLevel;
  subjectSlug: string;
  examType: ExamType;
  year: number;
  schoolOrProvince: string;
  sourceName: string;
  sourceUrl: string;
  durationMinutes: number;
  downloads: number;
  participantsOnline: number;
  questions: {
    id: number;
    question: string;
    options: [string, string, string, string];
    correctIndex: number;
    explanation: string;
  }[];
}

export const REAL_DOCUMENTS: RealDocumentResource[] = [
  {
    id: "doc-toan12-kntt-ch1",
    title: "Chuyên đề Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số Toán 12",
    description:
      "Tài liệu thực tế biên soạn theo SGK Toán 12 Kết nối tri thức (Chương 1): Tính đơn điệu, Cực trị, GTLN-GTNN, Đường tiệm cận và Khảo sát đồ thị kèm câu hỏi Đúng/Sai & Trả lời ngắn.",
    grade: 12,
    subjectSlug: "toan-hoc",
    chapter: "Chương 1: Ứng dụng đạo hàm",
    type: "exercise",
    fileSize: "4.8 MB",
    pages: 64,
    views: 12450,
    downloads: 5820,
    rating: 4.9,
    author: "Thầy Phan Nhật Linh & Thầy Trần Đình Cư",
    sourceName: "TOANMATH.com",
    sourceUrl: "https://toanmath.com/ung-dung-dao-ham-de-khao-sat-va-ve-do-thi-cua-ham-so",
    bookSeries: "Kết nối tri thức",
    year: 2025,
    fullContentMarkdown: `### I. TÓM TẮT LÝ THUYẾT TRỌNG TÂM (SGK TOÁN 12 - CHƯƠNG 1)

#### 1. Tính đơn điệu và Cực trị của hàm số
Cho hàm số $y = f(x)$ có đạo hàm trên khoảng $K$:
- Nếu $f'(x) > 0, \\forall x \\in K$ thì hàm số **đồng biến** trên $K$.
- Nếu $f'(x) < 0, \\forall x \\in K$ thì hàm số **nghịch biến** trên $K$.
- **Điều kiện cần và đủ để có cực trị:** Nếu $f'(x)$ đổi dấu từ dương $(+)$ sang âm $(-)$ khi đi qua $x_0$ thì $x_0$ là điểm **cực đại**. Ngược lại, đổi dấu từ âm $(-)$ sang dương $(+)$ thì $x_0$ là điểm **cực tiểu**.

#### 2. Giá trị lớn nhất (Max) và Giá trị nhỏ nhất (Min) trên đoạn $[a; b]$
1. Tìm các điểm $x_1, x_2, \\dots, x_n \\in (a; b)$ tại đó $f'(x) = 0$ hoặc không tồn tại.
2. Tính $f(a), f(b), f(x_1), \\dots, f(x_n)$.
3. So sánh các giá trị vừa tính để kết luận $\\max_{[a;b]} f(x)$ và $\\min_{[a;b]} f(x)$.

#### 3. Đường tiệm cận của đồ thị hàm số
- **Tiệm cận ngang:** Đường thẳng $y = y_0$ là TCN nếu $\\lim_{x \\to +\\infty} f(x) = y_0$ hoặc $\\lim_{x \\to -\\infty} f(x) = y_0$.
- **Tiệm cận đứng:** Đường thẳng $x = x_0$ là TCĐ nếu ít nhất một trong các giới hạn $\\lim_{x \\to x_0^+} f(x) = \\pm\\infty$ hoặc $\\lim_{x \\to x_0^-} f(x) = \\pm\\infty$.
- **Tiệm cận xiên:** Đường thẳng $y = ax + b \\ (a \\neq 0)$ là TCX nếu $\\lim_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0$, với:
$$a = \\lim_{x \\to \\pm\\infty} \\frac{f(x)}{x}, \\quad b = \\lim_{x \\to \\pm\\infty} [f(x) - ax]$$

---
### II. BÀI TẬP TRẮC NGHIỆM MẪU (CẤU TRÚC MỚI)
**Câu 1:** Cho hàm số $y = \\frac{x^2 - 3x + 5}{x - 1}$. Đường tiệm cận xiên của đồ thị hàm số là:
- Ta chia đa thức: $y = x - 2 + \\frac{3}{x - 1} \\Rightarrow$ Tiệm cận xiên là đường thẳng $y = x - 2$.`,
  },
  {
    id: "doc-hoa12-kntt-ester",
    title: "Lý thuyết & Danh pháp IUPAC mới: Bài 1 Ester – Lipid (Hóa học 12)",
    description:
      "Hệ thống toàn bộ quy tắc gọi tên danh pháp quốc tế IUPAC mới cho Ester, Carboxylic acid, chất béo (Triglyceride), tính chất hóa học và bài tập thủy phân.",
    grade: 12,
    subjectSlug: "hoa-hoc",
    chapter: "Chương 1: Ester – Lipid",
    type: "formula",
    fileSize: "3.2 MB",
    pages: 28,
    views: 9840,
    downloads: 4310,
    rating: 5.0,
    author: "Ban Chuyên Môn Hóa Học THPT",
    sourceName: "VietJack.com",
    sourceUrl: "https://vietjack.com/hoa-hoc-12-kn/bai-1-ester-lipid.jsp",
    bookSeries: "Kết nối tri thức",
    year: 2025,
    fullContentMarkdown: `### I. QUY TẮC GỌI TÊN ESTER THEO DANH PHÁP IUPAC MỚI (GDPT 2018)

Công thức chung của ester đơn chức: **$RCOOR'$**

$$\\text{Tên Ester} = \\text{Tên gốc hydrocarbon } R' + \\text{Tên gốc acid } RCOO^- \\text{ (đổi đuôi -ic thành -ate)}$$

#### Bảng đối chiếu Danh pháp IUPAC chuẩn SGK mới:
| Công thức cấu tạo | Gốc $R'$ (Alcohol) | Gốc Acid tương ứng | Tên gọi chuẩn IUPAC / Thông thường |
| :--- | :--- | :--- | :--- |
| $HCOOCH_3$ | methyl | methanoate (formate) | **methyl methanoate** (methyl formate) |
| $CH_3COOC_2H_5$ | ethyl | ethanoate (acetate) | **ethyl ethanoate** (ethyl acetate) |
| $CH_3COOCH=CH_2$ | vinyl | ethanoate (acetate) | **vinyl acetate** (vinyl ethanoate) |
| $CH_2=CHCOOCH_3$ | methyl | propenoate (acrylate) | **methyl acrylate** (methyl propenoate) |
| $CH_3COOC_6H_5$ | phenyl | ethanoate (acetate) | **phenyl acetate** |

---
### II. PHẢN ỨNG HÓA HỌC TRỌNG TÂM
1. **Thủy phân trong môi trường acid (phản ứng thuận nghịch):**
$$CH_3COOC_2H_5 + H_2O \\xrightleftharpoons{H_2SO_4 \\text{ đặc}, t^\\circ} CH_3COOH + C_2H_5OH$$
2. **Thủy phân trong môi trường kiềm (Phản ứng xà phòng hóa - 1 chiều):**
$$CH_3COOC_2H_5 + NaOH \\xrightarrow{t^\\circ} CH_3COONa + C_2H_5OH$$`,
  },
  {
    id: "doc-ly12-kntt-nhiet",
    title: "Chuyên đề Vật lí Nhiệt & Khí lý tưởng - Vật lí 12 Chương trình mới",
    description:
      "Tài liệu chuẩn hóa Chương 1 (Vật lí nhiệt) và Chương 2 (Khí lý tưởng): Định luật I Nhiệt động lực học, Nhiệt nóng chảy riêng, Nhiệt hóa hơi riêng và Phương trình trạng thái.",
    grade: 12,
    subjectSlug: "vat-ly",
    chapter: "Chương 1 & 2: Vật lí nhiệt - Khí lý tưởng",
    type: "theory",
    fileSize: "4.1 MB",
    pages: 45,
    views: 8120,
    downloads: 3690,
    rating: 4.9,
    author: "Thư Viện Học Liệu THPT",
    sourceName: "ThuVienHocLieu.com",
    sourceUrl: "https://thuvienhoclieu.com/tai-lieu-vat-li-12-ket-noi-tri-thuc/",
    bookSeries: "Kết nối tri thức",
    year: 2025,
    fullContentMarkdown: `### I. CÔNG THỨC VẬT LÍ NHIỆT (CHƯƠNG 1 - VẬT LÍ 12 MỚI)

#### 1. Định luật I Nhiệt động lực học
$$\\Delta U = A + Q$$
- **Quy ước dấu:**
  - $Q > 0$: Hệ nhận nhiệt lượng; $Q < 0$: Hệ truyền nhiệt lượng.
  - $A > 0$: Hệ nhận công; $A < 0$: Hệ thực hiện công.

#### 2. Nhiệt lượng thu vào / tỏa ra, Nhiệt nóng chảy & Nhiệt hóa hơi
- **Nhiệt lượng làm thay đổi nhiệt độ:** $Q = m \\cdot c \\cdot \\Delta T$
- **Nhiệt nóng chảy riêng $\\lambda$ (J/kg):** $Q = \\lambda \\cdot m$
- **Nhiệt hóa hơi riêng $L$ (J/kg):** $Q = L \\cdot m$

---
### II. PHƯƠNG TRÌNH TRẠNG THÁI KHÍ LÝ TƯỞNG (CHƯƠNG 2)
- **Phương trình trạng thái:**
$$\\frac{pV}{T} = \\text{hằng số} \\quad \\text{hay} \\quad \\frac{p_1 V_1}{T_1} = \\frac{p_2 V_2}{T_2}$$
- **Phương trình Clapeyron:**
$$pV = nRT \\quad (R \\approx 8,31 \\text{ J/mol.K})$$`,
  },
  {
    id: "doc-anh10-globalsuccess",
    title: "Trọn bộ Ngữ pháp & Từ vựng Tiếng Anh 10 Global Success (Unit 1 - Unit 10)",
    description:
      "Tổng hợp từ vựng có phiên âm IPA, Collocations và chuyên đề ngữ pháp từng Unit (Family Life, Humans and the Environment, Music, Inventions, Ecotourism).",
    grade: 10,
    subjectSlug: "tieng-anh",
    chapter: "Unit 1 - Unit 10: Global Success 10",
    type: "theory",
    fileSize: "2.7 MB",
    pages: 38,
    views: 7430,
    downloads: 3120,
    rating: 4.8,
    author: "Ban Chuyên Môn Tiếng Anh",
    sourceName: "LoiGiaiHay.com",
    sourceUrl: "https://loigiaihay.com/tieng-anh-10-ket-noi-tri-thuc-global-success-c683.html",
    bookSeries: "Kết nối tri thức",
    year: 2025,
    fullContentMarkdown: `### I. TỪ VỰNG TRỌNG TÂM TIẾNG ANH 10 GLOBAL SUCCESS

#### Unit 1: Family Life (Đời sống gia đình)
- **breadwinner** /ˈbredwɪnə(r)/ (n): trụ cột gia đình (người kiếm tiền nuôi gia đình)
- **homemaker** /ˈhəʊmmeɪkə(r)/ (n): người nội trợ
- **household chores** /ˈhaʊshəʊld tʃɔːz/ (n.phr): công việc nhà
- **divide the household chores equally**: phân chia việc nhà công bằng

#### Unit 2: Humans and the Environment (Con người và Môi trường)
- **carbon footprint** /ˌkɑːbən ˈfʊtprɪnt/ (n): dấu chân carbon (lượng khí thải nhà kính)
- **eco-friendly** /ˌiːkəʊ ˈfrendli/ (adj): thân thiện với môi trường
- **sustainable lifestyle** /səˈsteɪnəbl ˈlaɪfstaɪl/ (n.phr): lối sống bền vững

---
### II. NGỮ PHÁP TRỌNG TÂM
1. **Present Simple vs. Present Continuous (Unit 1):**
   - Hiện tại đơn diễn tả thói quen hàng ngày (*My mother usually cooks dinner*).
   - Hiện tại tiếp diễn diễn tả hành động đang xảy ra tại thời điểm nói (*She is working at the moment*).
2. **Will vs. Be going to & Passive Voice (Unit 2):**
   - *Be going to + V*: Dự định đã có kế hoạch từ trước hoặc dự đoán có căn cứ.
   - *Passive Voice*: $S + \\text{be} + V_{ed/3} + (\\text{by } O)$.`,
  },
  {
    id: "doc-van12-nlxh-2025",
    title: "Cấu trúc Đọc hiểu & Viết bài văn Nghị luận xã hội 600 chữ (Đề minh họa mới)",
    description:
      "Bám sát cấu trúc đề thi Tốt nghiệp THPT từ năm 2025 của Bộ GD&ĐT (100% ngữ liệu ngoài SGK): Kỹ năng trả lời 5 câu Đọc hiểu, viết đoạn văn 200 chữ và bài văn 600 chữ.",
    grade: 12,
    subjectSlug: "ngu-van",
    chapter: "Chuyên đề: Đọc hiểu & Nghị luận",
    type: "mindmap",
    fileSize: "3.0 MB",
    pages: 32,
    views: 6890,
    downloads: 2950,
    rating: 4.9,
    author: "Hệ thống Học liệu Ngữ Văn",
    sourceName: "VietJack.com",
    sourceUrl: "https://vietjack.com/ngu-van-12-kn/index.jsp",
    bookSeries: "Chung GDPT 2018",
    year: 2025,
    fullContentMarkdown: `### CẤU TRÚC ĐỀ THI TỐT NGHIỆP THPT MÔN NGỮ VĂN (TỪ 2025)

1. **Phần I. Đọc hiểu (4,0 điểm):**
   - Ngữ liệu **ngoài sách giáo khoa** (văn bản văn học, văn bản nghị luận hoặc văn bản thông tin).
   - Gồm 5 câu hỏi phân hóa theo các cấp độ: Nhận biết (2 câu) – Thông hiểu (2 câu) – Vận dụng (1 câu).

2. **Phần II. Viết (6,0 điểm):**
   - **Câu 1 (2,0 điểm):** Viết đoạn văn nghị luận (khoảng 200 chữ) phân tích một khía cạnh của văn bản ngữ liệu hoặc nghị luận xã hội.
   - **Câu 2 (4,0 điểm):** Viết bài văn nghị luận (khoảng 600 chữ) bàn về một vấn đề xã hội gắn với tuổi trẻ hoặc phân tích đánh giá tác phẩm văn học.`,
  },
  {
    id: "doc-toan11-xacsuat",
    title: "Chuyên đề Các quy tắc tính Xác suất & Biến cố độc lập Toán 11",
    description:
      "Lý thuyết và bài tập chọn lọc Chương 8 Toán 11: Biến cố hợp, biến cố giao, biến cố độc lập, công thức cộng và công thức nhân xác suất.",
    grade: 11,
    subjectSlug: "toan-hoc",
    chapter: "Chương 8: Các quy tắc tính xác suất",
    type: "advanced",
    fileSize: "3.9 MB",
    pages: 48,
    views: 5320,
    downloads: 2410,
    rating: 4.8,
    author: "Ban Toán Học TOANMATH",
    sourceName: "TOANMATH.com",
    sourceUrl: "https://toanmath.com/toan-11",
    bookSeries: "Chân trời sáng tạo",
    year: 2025,
    fullContentMarkdown: `### TÓM TẮT QUY TẮC TÍNH XÁC SUẤT (TOÁN 11)

1. **Công thức cộng xác suất cho 2 biến cố bất kỳ $A$ và $B$:**
$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$
- Nếu $A$ và $B$ **xung khắc** ($A \\cap B = \\varnothing$):
$$P(A \\cup B) = P(A) + P(B)$$

2. **Công thức nhân xác suất cho 2 biến cố độc lập $A$ và $B$:**
- Hai biến cố $A, B$ độc lập khi và chỉ khi:
$$P(AB) = P(A) \\cdot P(B)$$`,
  },
];

export const REAL_EXAMS: RealExamResource[] = [
  {
    id: "exam-toan12-bbo",
    title: "Đề tham khảo Kỳ thi Tốt nghiệp THPT từ năm 2025 môn Toán - Bộ GD&ĐT",
    grade: 12,
    subjectSlug: "toan-hoc",
    examType: "thptqg",
    year: 2025,
    schoolOrProvince: "Bộ Giáo dục & Đào tạo",
    sourceName: "TOANMATH.com",
    sourceUrl: "https://toanmath.com/de-thi-thu-toan-thpt-quoc-gia",
    durationMinutes: 90,
    downloads: 18420,
    participantsOnline: 124,
    questions: [
      {
        id: 1,
        question:
          "Cho hàm số y = f(x) = x³ - 3x² + 2. Giá trị cực đại của hàm số đã cho bằng bao nhiêu?",
        options: ["y = 2", "y = -2", "y = 0", "y = 4"],
        correctIndex: 0,
        explanation:
          "Ta có y' = 3x² - 6x = 0 ⇔ x = 0 hoặc x = 2. Bảng biến thiên cho thấy hàm số đạt cực đại tại x = 0 và y_CĐ = f(0) = 2.",
      },
      {
        id: 2,
        question:
          "Đường tiệm cận ngang của đồ thị hàm số y = (2x - 1) / (x + 3) có phương trình là:",
        options: ["y = -3", "y = 2", "x = -3", "y = -1/3"],
        correctIndex: 1,
        explanation:
          "Vì lim(x→±∞) [(2x - 1)/(x + 3)] = 2 nên y = 2 là tiệm cận ngang.",
      },
      {
        id: 3,
        question: "Họ nguyên hàm của hàm số f(x) = cos(x) + 2x trên ℝ là:",
        options: [
          "-sin(x) + x² + C",
          "sin(x) + x² + C",
          "sin(x) + 2 + C",
          "-cos(x) + x² + C",
        ],
        correctIndex: 1,
        explanation:
          "Áp dụng công thức nguyên hàm cơ bản: ∫(cos x + 2x)dx = sin(x) + x² + C.",
      },
      {
        id: 4,
        question:
          "Trong không gian Oxyz, cho vectơ u = (2; -1; 2). Độ dài của vectơ u bằng:",
        options: ["3", "√5", "9", "5"],
        correctIndex: 0,
        explanation: "|u| = √(2² + (-1)² + 2²) = √9 = 3.",
      },
      {
        id: 5,
        question:
          "Gieo một con xúc xắc cân đối và đồng chất 1 lần. Xác suất để xuất hiện mặt có số chấm chẵn là:",
        options: ["1/6", "1/3", "1/2", "2/3"],
        correctIndex: 2,
        explanation: "Có 3 kết quả thuận lợi {2; 4; 6} trên 6 khả năng ⇒ P = 3/6 = 1/2.",
      },
    ],
  },
  {
    id: "exam-ly12-sogdhanoi",
    title: "Đề khảo sát chất lượng Vật lí 12 theo cấu trúc mới - Sở GD&ĐT Hà Nội",
    grade: 12,
    subjectSlug: "vat-ly",
    examType: "thptqg",
    year: 2025,
    schoolOrProvince: "Sở GD&ĐT Hà Nội",
    sourceName: "ThuVienHocLieu.com",
    sourceUrl: "https://thuvienhoclieu.com/de-thi-thu-tot-nghiep-thpt-mon-vat-li/",
    durationMinutes: 50,
    downloads: 7320,
    participantsOnline: 68,
    questions: [
      {
        id: 1,
        question:
          "Theo Định luật I Nhiệt động lực học ΔU = A + Q, khi chất khí nhận nhiệt lượng 150 J và thực hiện công 90 J thì độ biến thiên nội năng ΔU bằng:",
        options: ["240 J", "60 J", "-60 J", "-240 J"],
        correctIndex: 1,
        explanation:
          "Hệ nhận nhiệt nên Q = +150 J; hệ thực hiện công nên A = -90 J. Vậy ΔU = A + Q = -90 + 150 = 60 J.",
      },
      {
        id: 2,
        question:
          "Trong quá trình đẳng nhiệt của một lượng khí lý tưởng xác định, khi áp suất tăng gấp 2 lần thì thể tích của khí sẽ:",
        options: [
          "Tăng gấp 2 lần",
          "Giảm đi 2 lần",
          "Không thay đổi",
          "Tăng gấp 4 lần",
        ],
        correctIndex: 1,
        explanation:
          "Theo định luật Boyle (p₁V₁ = p₂V₂), áp suất tỉ lệ nghịch với thể tích nên khi p tăng 2 lần thì V giảm 2 lần.",
      },
      {
        id: 3,
        question:
          "Đơn vị đo của nhiệt nóng chảy riêng λ trong hệ SI là:",
        options: ["J/kg", "J/(kg.K)", "J/mol", "W/m²"],
        correctIndex: 0,
        explanation:
          "Từ công thức Q = λ.m suy ra λ = Q/m có đơn vị là Joule trên kilôgam (J/kg).",
      },
    ],
  },
  {
    id: "exam-hoa12-chuyenkhtn",
    title: "Đề kiểm tra Chuyên đề Ester - Lipid & Carbohydrate Hóa 12 - Chuyên KHTN",
    grade: 12,
    subjectSlug: "hoa-hoc",
    examType: "midterm",
    year: 2025,
    schoolOrProvince: "THPT Chuyên KHTN Hà Nội",
    sourceName: "VietJack.com",
    sourceUrl: "https://vietjack.com/de-kiem-tra-hoa-12/index.jsp",
    durationMinutes: 50,
    downloads: 6410,
    participantsOnline: 54,
    questions: [
      {
        id: 1,
        question:
          "Theo danh pháp IUPAC mới, hợp chất CH₃COOC₂H₅ có tên gọi là:",
        options: [
          "Methyl ethanoate",
          "Ethyl ethanoate (Ethyl acetate)",
          "Propyl methanoate",
          "Vinyl acetate",
        ],
        correctIndex: 1,
        explanation:
          "Gốc C₂H₅- đọc là ethyl; gốc CH₃COO- đọc là ethanoate (hoặc acetate) ⇒ Ethyl ethanoate.",
      },
      {
        id: 2,
        question:
          "Thủy phân hoàn toàn tristearin (C₁₇H₃₅COO)₃C₃H₅ trong dung dịch NaOH đun nóng thu được alcohol nào?",
        options: ["Ethanol", "Methanol", "Glycerol", "Ethylene glycol"],
        correctIndex: 2,
        explanation:
          "Mọi chất béo (triglyceride) khi xà phòng hóa đều thu được muối của acid béo và glycerol C₃H₅(OH)₃.",
      },
    ],
  },
  {
    id: "exam-anh11-globalsuccess",
    title: "Đề kiểm tra Giữa kỳ 1 Tiếng Anh 11 Global Success có đáp án giải thích",
    grade: 11,
    subjectSlug: "tieng-anh",
    examType: "midterm",
    year: 2025,
    schoolOrProvince: "THPT Chuyên Lê Hồng Phong",
    sourceName: "LoiGiaiHay.com",
    sourceUrl: "https://loigiaihay.com/de-thi-tieng-anh-11-ket-noi-tri-thuc-global-success-c830.html",
    durationMinutes: 45,
    downloads: 4890,
    participantsOnline: 37,
    questions: [
      {
        id: 1,
        question:
          "Choose the best answer: Regular exercise and a balanced diet are the key to a ______ lifestyle.",
        options: ["health", "healthy", "healthily", "unhealthy"],
        correctIndex: 1,
        explanation:
          "Trước danh từ 'lifestyle' cần một tính từ mang nghĩa tích cực ⇒ 'healthy' (lành mạnh).",
      },
      {
        id: 2,
        question:
          "Choose the correct verb form: My grandfather ______ regular exercise since he retired 10 years ago.",
        options: ["did", "does", "has done", "was doing"],
        correctIndex: 2,
        explanation:
          "Mệnh đề trạng ngữ 'since + mốc quá khứ' đi với thì Hiện tại hoàn thành (has done).",
      },
    ],
  },
];
