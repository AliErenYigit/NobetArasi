import type { QuizQuestion } from "../types/quiz";

const options = {
  abcd: {
    A: "Seçenek A",
    B: "Seçenek B",
    C: "Seçenek C",
    D: "Seçenek D",
  },
};

export const demoQuestions: QuizQuestion[] = [
  // Mikrobiyoloji - categoryId: 1
  {
    id: 1,
    categoryId: 1,
    questionText:
      "Paslı balgam ile seyreden lober pnömonide en olası etken hangisidir?",
    options: [
      { id: "A", text: "Streptococcus pneumoniae" },
      { id: "B", text: "Mycoplasma pneumoniae" },
      { id: "C", text: "Klebsiella pneumoniae" },
      { id: "D", text: "Staphylococcus aureus" },
    ],
    correctOptionId: "A",
    explanation:
      "Lober pnömoni ve paslı balgam klasik olarak S. pneumoniae ile ilişkilidir.",
    tusNote: "Lober pnömoni + paslı balgam → S. pneumoniae.",
  },
  {
    id: 2,
    categoryId: 1,
    questionText:
      "Bakteriyel menenjitte BOS bulguları için en uygun ifade hangisidir?",
    options: [
      { id: "A", text: "Lenfosit artışı, glukoz normal" },
      { id: "B", text: "Nötrofil artışı, glukoz düşük" },
      { id: "C", text: "Protein düşük, glukoz yüksek" },
      { id: "D", text: "Eritrosit artışı, protein normal" },
    ],
    correctOptionId: "B",
    explanation:
      "Bakteriyel menenjitte BOS'ta nötrofil ve protein artar, glukoz düşer.",
    tusNote: "Bakteriyel menenjit → nötrofil ↑, protein ↑, glukoz ↓.",
  },
  {
    id: 3,
    categoryId: 1,
    questionText: "Gram pozitif koklardan biri hangisidir?",
    options: [
      { id: "A", text: "Escherichia coli" },
      { id: "B", text: "Pseudomonas aeruginosa" },
      { id: "C", text: "Staphylococcus aureus" },
      { id: "D", text: "Neisseria meningitidis" },
    ],
    correctOptionId: "C",
    explanation: "Staphylococcus aureus gram pozitif koktur.",
    tusNote: "Staphylococcus ve Streptococcus → gram pozitif kok.",
  },
  {
    id: 4,
    categoryId: 1,
    questionText: "Aside dirençli boyanan mikroorganizma hangisidir?",
    options: [
      { id: "A", text: "Mycobacterium tuberculosis" },
      { id: "B", text: "Streptococcus pyogenes" },
      { id: "C", text: "Candida albicans" },
      { id: "D", text: "Treponema pallidum" },
    ],
    correctOptionId: "A",
    explanation:
      "Mycobacterium tuberculosis aside dirençli boyanma özelliği gösterir.",
    tusNote: "Aside dirençli basil → Mycobacterium.",
  },
  {
    id: 5,
    categoryId: 1,
    questionText: "Kapsüllü bakteriler için en önemli virülans faktörü nedir?",
    options: [
      { id: "A", text: "Flagella" },
      { id: "B", text: "Kapsül" },
      { id: "C", text: "Ribozom" },
      { id: "D", text: "Plazmid" },
    ],
    correctOptionId: "B",
    explanation:
      "Kapsül, fagositozdan kaçışı kolaylaştıran önemli bir virülans faktörüdür.",
    tusNote: "Kapsül → antifagositik etki.",
  },
  {
    id: 6,
    categoryId: 1,
    questionText: "Boğaz ağrısı ve döküntü ile seyreden kızıl hastalığında etken hangisidir?",
    options: [
      { id: "A", text: "Streptococcus pyogenes" },
      { id: "B", text: "Staphylococcus epidermidis" },
      { id: "C", text: "Enterococcus faecalis" },
      { id: "D", text: "Bacillus anthracis" },
    ],
    correctOptionId: "A",
    explanation:
      "Kızıl hastalığı, eritrojenik toksin üreten S. pyogenes ile ilişkilidir.",
    tusNote: "Kızıl → S. pyogenes.",
  },
  {
    id: 7,
    categoryId: 1,
    questionText: "Viral enfeksiyonlarda hücre içi çoğalma için temel gereksinim nedir?",
    options: [
      { id: "A", text: "Konak hücre mekanizmaları" },
      { id: "B", text: "Peptidoglikan sentezi" },
      { id: "C", text: "Bağımsız ribozom sistemi" },
      { id: "D", text: "Dış ortamda spor oluşumu" },
    ],
    correctOptionId: "A",
    explanation:
      "Virüsler çoğalmak için konak hücre mekanizmalarına ihtiyaç duyar.",
    tusNote: "Virüsler zorunlu hücre içi parazittir.",
  },
  {
    id: 8,
    categoryId: 1,
    questionText: "Candida enfeksiyonları hangi mikroorganizma grubuna girer?",
    options: [
      { id: "A", text: "Bakteri" },
      { id: "B", text: "Mantar" },
      { id: "C", text: "Virüs" },
      { id: "D", text: "Prion" },
    ],
    correctOptionId: "B",
    explanation: "Candida bir mantardır.",
    tusNote: "Candida → maya tipi mantar.",
  },
  {
    id: 9,
    categoryId: 1,
    questionText: "Neisseria türleri mikroskopide genellikle nasıl görülür?",
    options: [
      { id: "A", text: "Gram pozitif basil" },
      { id: "B", text: "Gram negatif diplokok" },
      { id: "C", text: "Aside dirençli basil" },
      { id: "D", text: "Gram pozitif zincir kok" },
    ],
    correctOptionId: "B",
    explanation: "Neisseria türleri gram negatif diplokok olarak görülür.",
    tusNote: "Neisseria → gram negatif diplokok.",
  },
  {
    id: 10,
    categoryId: 1,
    questionText: "Bakterilerde protein sentezinin ana yapısı hangisidir?",
    options: [
      { id: "A", text: "Mitokondri" },
      { id: "B", text: "Ribozom" },
      { id: "C", text: "Lizozom" },
      { id: "D", text: "Golgi aygıtı" },
    ],
    correctOptionId: "B",
    explanation: "Protein sentezi ribozomlarda gerçekleşir.",
    tusNote: "Bakteri ribozomu → 70S.",
  },

  // Farmakoloji - categoryId: 2
  {
    id: 11,
    categoryId: 2,
    questionText: "Beta-laktam antibiyotiklerin temel etki mekanizması nedir?",
    options: [
      { id: "A", text: "Protein sentezini inhibe etmek" },
      { id: "B", text: "Hücre duvarı sentezini inhibe etmek" },
      { id: "C", text: "DNA girazı aktive etmek" },
      { id: "D", text: "Folat sentezini artırmak" },
    ],
    correctOptionId: "B",
    explanation:
      "Beta-laktamlar bakteri hücre duvarı sentezini inhibe eder.",
    tusNote: "Beta-laktam → hücre duvarı sentezi inhibisyonu.",
  },
  {
    id: 12,
    categoryId: 2,
    questionText: "Makrolidlerin temel etki yeri hangisidir?",
    options: [
      { id: "A", text: "30S ribozomal alt birim" },
      { id: "B", text: "50S ribozomal alt birim" },
      { id: "C", text: "Hücre duvarı" },
      { id: "D", text: "Hücre membranı" },
    ],
    correctOptionId: "B",
    explanation:
      "Makrolidler 50S ribozomal alt birime bağlanarak protein sentezini inhibe eder.",
    tusNote: "Makrolid → 50S.",
  },
  {
    id: 13,
    categoryId: 2,
    questionText: "ACE inhibitörlerinin sık görülen yan etkilerinden biri hangisidir?",
    options: [
      { id: "A", text: "Kuru öksürük" },
      { id: "B", text: "Hipoglisemi" },
      { id: "C", text: "İşitme kaybı" },
      { id: "D", text: "Diş eti hipertrofisi" },
    ],
    correctOptionId: "A",
    explanation:
      "ACE inhibitörleri bradikinin artışıyla kuru öksürük yapabilir.",
    tusNote: "ACE inhibitörü → kuru öksürük, hiperkalemi, anjiyoödem.",
  },
  {
    id: 14,
    categoryId: 2,
    questionText: "Loop diüretiklerin etki yeri neresidir?",
    options: [
      { id: "A", text: "Proksimal tübül" },
      { id: "B", text: "Henle kulpu kalın çıkan kol" },
      { id: "C", text: "Distal tübül" },
      { id: "D", text: "Toplayıcı kanal" },
    ],
    correctOptionId: "B",
    explanation:
      "Loop diüretikler Henle kulpunun kalın çıkan kolunda etki gösterir.",
    tusNote: "Furosemid → Henle kalın çıkan kol.",
  },
  {
    id: 15,
    categoryId: 2,
    questionText: "Warfarin hangi vitaminin etkisini antagonize eder?",
    options: [
      { id: "A", text: "Vitamin A" },
      { id: "B", text: "Vitamin B12" },
      { id: "C", text: "Vitamin K" },
      { id: "D", text: "Vitamin D" },
    ],
    correctOptionId: "C",
    explanation: "Warfarin vitamin K bağımlı pıhtılaşma faktörlerini azaltır.",
    tusNote: "Warfarin → vitamin K antagonisti.",
  },
  {
    id: 16,
    categoryId: 2,
    questionText: "Statinlerin temel etki mekanizması nedir?",
    options: [
      { id: "A", text: "HMG-CoA redüktaz inhibisyonu" },
      { id: "B", text: "ACE inhibisyonu" },
      { id: "C", text: "Beta reseptör blokajı" },
      { id: "D", text: "Kalsiyum kanal aktivasyonu" },
    ],
    correctOptionId: "A",
    explanation: "Statinler HMG-CoA redüktaz enzimini inhibe eder.",
    tusNote: "Statin → HMG-CoA redüktaz inhibisyonu.",
  },
  {
    id: 17,
    categoryId: 2,
    questionText: "Beta blokerlerin kardiyak etkilerinden biri hangisidir?",
    options: [
      { id: "A", text: "Kalp hızını artırmak" },
      { id: "B", text: "Kalp hızını azaltmak" },
      { id: "C", text: "Bronkodilatasyon yapmak" },
      { id: "D", text: "Renin salınımını artırmak" },
    ],
    correctOptionId: "B",
    explanation: "Beta blokerler kalp hızını azaltabilir.",
    tusNote: "Beta bloker → negatif kronotropi.",
  },
  {
    id: 18,
    categoryId: 2,
    questionText: "Aminoglikozidlerin önemli toksisitelerinden biri hangisidir?",
    options: [
      { id: "A", text: "Ototoksisite" },
      { id: "B", text: "Hipoglisemi" },
      { id: "C", text: "Diş eti hipertrofisi" },
      { id: "D", text: "Katarakt" },
    ],
    correctOptionId: "A",
    explanation: "Aminoglikozidler ototoksisite ve nefrotoksisite yapabilir.",
    tusNote: "Aminoglikozid → oto/nefrotoksisite.",
  },
  {
    id: 19,
    categoryId: 2,
    questionText: "Heparinin antidotu hangisidir?",
    options: [
      { id: "A", text: "Protamin sülfat" },
      { id: "B", text: "Vitamin K" },
      { id: "C", text: "Nalokson" },
      { id: "D", text: "Flumazenil" },
    ],
    correctOptionId: "A",
    explanation: "Heparin etkisi protamin sülfat ile geri çevrilebilir.",
    tusNote: "Heparin antidotu → protamin sülfat.",
  },
  {
    id: 20,
    categoryId: 2,
    questionText: "Opioid toksisitesinde kullanılan antidot hangisidir?",
    options: [
      { id: "A", text: "Nalokson" },
      { id: "B", text: "Atropin" },
      { id: "C", text: "Asetilsistein" },
      { id: "D", text: "Deferoksamin" },
    ],
    correctOptionId: "A",
    explanation: "Nalokson opioid reseptör antagonistidir.",
    tusNote: "Opioid toksisitesi → nalokson.",
  },

  // Patoloji - categoryId: 3
  {
    id: 21,
    categoryId: 3,
    questionText: "Apoptoz için en uygun ifade hangisidir?",
    options: [
      { id: "A", text: "Kontrollü hücre ölümü" },
      { id: "B", text: "Her zaman inflamasyonla gider" },
      { id: "C", text: "Sadece bakterilerde olur" },
      { id: "D", text: "Nekroz ile tamamen aynıdır" },
    ],
    correctOptionId: "A",
    explanation: "Apoptoz kontrollü/programlı hücre ölümüdür.",
    tusNote: "Apoptoz → kontrollü hücre ölümü.",
  },
  {
    id: 22,
    categoryId: 3,
    questionText: "Nekrozda genellikle hangi süreç daha belirgindir?",
    options: [
      { id: "A", text: "İnflamasyon" },
      { id: "B", text: "DNA tamiri" },
      { id: "C", text: "Fizyolojik hücre eliminasyonu" },
      { id: "D", text: "Hücre küçülmesi" },
    ],
    correctOptionId: "A",
    explanation: "Nekrozda hücre içeriği dışarı çıkar ve inflamasyon belirgindir.",
    tusNote: "Nekroz → inflamasyon daha belirgin.",
  },
  {
    id: 23,
    categoryId: 3,
    questionText: "Granülomatöz inflamasyon için tipik hücre hangisidir?",
    options: [
      { id: "A", text: "Epiteloid histiyosit" },
      { id: "B", text: "Eritrosit" },
      { id: "C", text: "Trombosit" },
      { id: "D", text: "Nöron" },
    ],
    correctOptionId: "A",
    explanation:
      "Granülomatöz inflamasyonda epiteloid histiyositler önemli rol oynar.",
    tusNote: "Granülom → epiteloid histiyosit.",
  },
  {
    id: 24,
    categoryId: 3,
    questionText: "Akut inflamasyonda baskın hücre genellikle hangisidir?",
    options: [
      { id: "A", text: "Nötrofil" },
      { id: "B", text: "Fibroblast" },
      { id: "C", text: "Plazma hücresi" },
      { id: "D", text: "Adiposit" },
    ],
    correctOptionId: "A",
    explanation: "Akut inflamasyonda nötrofiller baskındır.",
    tusNote: "Akut inflamasyon → nötrofil.",
  },
  {
    id: 25,
    categoryId: 3,
    questionText: "Kronik inflamasyonda daha çok hangi hücre grubu görülür?",
    options: [
      { id: "A", text: "Lenfosit ve makrofaj" },
      { id: "B", text: "Eritrosit ve trombosit" },
      { id: "C", text: "Nötrofil ve bazofil" },
      { id: "D", text: "Melanosit ve adiposit" },
    ],
    correctOptionId: "A",
    explanation: "Kronik inflamasyonda lenfosit ve makrofajlar ön plandadır.",
    tusNote: "Kronik inflamasyon → lenfosit, makrofaj.",
  },
  {
    id: 26,
    categoryId: 3,
    questionText: "Metaplazi için en uygun tanım hangisidir?",
    options: [
      { id: "A", text: "Bir erişkin hücre tipinin başka bir erişkin hücre tipine dönüşmesi" },
      { id: "B", text: "Hücre sayısının azalması" },
      { id: "C", text: "Kontrolsüz malign çoğalma" },
      { id: "D", text: "Hücre membranının ani parçalanması" },
    ],
    correctOptionId: "A",
    explanation:
      "Metaplazi, bir diferansiye hücre tipinin başka bir diferansiye hücre tipine dönüşmesidir.",
    tusNote: "Metaplazi → adaptif, geri dönüşebilir değişim.",
  },
  {
    id: 27,
    categoryId: 3,
    questionText: "Hiperplazi için en uygun ifade hangisidir?",
    options: [
      { id: "A", text: "Hücre sayısında artış" },
      { id: "B", text: "Hücre boyutunda azalma" },
      { id: "C", text: "DNA kaybı" },
      { id: "D", text: "Sadece nöronlarda görülür" },
    ],
    correctOptionId: "A",
    explanation: "Hiperplazi hücre sayısındaki artıştır.",
    tusNote: "Hiperplazi → hücre sayısı artar.",
  },
  {
    id: 28,
    categoryId: 3,
    questionText: "Hipertrofi için en uygun ifade hangisidir?",
    options: [
      { id: "A", text: "Hücre boyutunda artış" },
      { id: "B", text: "Hücre sayısında azalma" },
      { id: "C", text: "Tümör nekrozu" },
      { id: "D", text: "Mikrobiyal invazyon" },
    ],
    correctOptionId: "A",
    explanation: "Hipertrofi hücre boyutundaki artıştır.",
    tusNote: "Hipertrofi → hücre boyutu artar.",
  },
  {
    id: 29,
    categoryId: 3,
    questionText: "Displazi için en uygun ifade hangisidir?",
    options: [
      { id: "A", text: "Düzensiz hücresel büyüme ve maturasyon bozukluğu" },
      { id: "B", text: "Tamamen fizyolojik büyüme" },
      { id: "C", text: "Her zaman benign durum" },
      { id: "D", text: "Sadece enfeksiyon bulgusu" },
    ],
    correctOptionId: "A",
    explanation:
      "Displazi hücresel atipi ve maturasyon bozukluğu ile ilişkili olabilir.",
    tusNote: "Displazi → premalign potansiyel taşıyabilir.",
  },
  {
    id: 30,
    categoryId: 3,
    questionText: "Malign tümörler için en önemli özelliklerden biri hangisidir?",
    options: [
      { id: "A", text: "İnvazyon ve metastaz potansiyeli" },
      { id: "B", text: "Her zaman kapsüllü olması" },
      { id: "C", text: "Asla nüks etmemesi" },
      { id: "D", text: "Sadece lokal büyümesi" },
    ],
    correctOptionId: "A",
    explanation:
      "Malign tümörlerin invazyon ve metastaz potansiyeli vardır.",
    tusNote: "Malignite → invazyon/metastaz.",
  },

  // Dahiliye - categoryId: 4
  {
    id: 31,
    categoryId: 4,
    questionText: "Diabetes mellitus tanısında kullanılan temel laboratuvar parametrelerinden biri hangisidir?",
    options: [
      { id: "A", text: "Açlık plazma glukozu" },
      { id: "B", text: "Serum sodyumu" },
      { id: "C", text: "Serum amilazı" },
      { id: "D", text: "Troponin I" },
    ],
    correctOptionId: "A",
    explanation:
      "Açlık plazma glukozu diyabet tanısında kullanılan temel parametrelerden biridir.",
    tusNote: "DM değerlendirmesi → açlık glukozu, HbA1c, OGTT.",
  },
  {
    id: 32,
    categoryId: 4,
    questionText: "Hipotiroidide beklenen laboratuvar bulgusu hangisidir?",
    options: [
      { id: "A", text: "TSH yüksekliği" },
      { id: "B", text: "TSH düşüklüğü" },
      { id: "C", text: "Troponin yüksekliği" },
      { id: "D", text: "Amilaz düşüklüğü" },
    ],
    correctOptionId: "A",
    explanation:
      "Primer hipotiroidide genellikle TSH yüksekliği beklenir.",
    tusNote: "Primer hipotiroidi → TSH ↑.",
  },
  {
    id: 33,
    categoryId: 4,
    questionText: "Demir eksikliği anemisinde beklenen bulgulardan biri hangisidir?",
    options: [
      { id: "A", text: "Mikrositik anemi" },
      { id: "B", text: "Makrositik anemi" },
      { id: "C", text: "Lökositoz olmadan tanı konulamaz" },
      { id: "D", text: "Trombosit sıfırlanır" },
    ],
    correctOptionId: "A",
    explanation:
      "Demir eksikliği anemisi tipik olarak mikrositik hipokrom anemi yapar.",
    tusNote: "Demir eksikliği → mikrositik hipokrom anemi.",
  },
  {
    id: 34,
    categoryId: 4,
    questionText: "Akut miyokard enfarktüsü değerlendirmesinde önemli biyobelirteç hangisidir?",
    options: [
      { id: "A", text: "Troponin" },
      { id: "B", text: "Albumin" },
      { id: "C", text: "Üre" },
      { id: "D", text: "Bilirubin" },
    ],
    correctOptionId: "A",
    explanation:
      "Troponin akut miyokard hasarı değerlendirmesinde önemli bir biyobelirteçtir.",
    tusNote: "AMI şüphesi → EKG + troponin.",
  },
  {
    id: 35,
    categoryId: 4,
    questionText: "KOAH için en önemli risk faktörlerinden biri hangisidir?",
    options: [
      { id: "A", text: "Sigara kullanımı" },
      { id: "B", text: "Düşük protein alımı" },
      { id: "C", text: "Göz tansiyonu" },
      { id: "D", text: "Hipotiroidi" },
    ],
    correctOptionId: "A",
    explanation:
      "Sigara kullanımı KOAH için en önemli risk faktörlerinden biridir.",
    tusNote: "KOAH → en önemli risk faktörü sigara.",
  },
  {
    id: 36,
    categoryId: 4,
    questionText: "Sirozda portal hipertansiyonun sonuçlarından biri hangisidir?",
    options: [
      { id: "A", text: "Özofagus varisi" },
      { id: "B", text: "Hiperkalsemi" },
      { id: "C", text: "Akut otit" },
      { id: "D", text: "Migren atağı" },
    ],
    correctOptionId: "A",
    explanation:
      "Portal hipertansiyon özofagus varisleri ve asit gibi bulgulara yol açabilir.",
    tusNote: "Portal HT → varis, asit, splenomegali.",
  },
  {
    id: 37,
    categoryId: 4,
    questionText: "Akut pankreatitte sık kullanılan laboratuvar göstergesi hangisidir?",
    options: [
      { id: "A", text: "Lipaz" },
      { id: "B", text: "TSH" },
      { id: "C", text: "Troponin" },
      { id: "D", text: "Ferritin tek başına" },
    ],
    correctOptionId: "A",
    explanation:
      "Akut pankreatitte lipaz yüksekliği tanısal değerlendirmede kullanılır.",
    tusNote: "Akut pankreatit → lipaz/amylaz yüksekliği.",
  },
  {
    id: 38,
    categoryId: 4,
    questionText: "B12 eksikliğinde beklenen anemi tipi hangisidir?",
    options: [
      { id: "A", text: "Makrositik anemi" },
      { id: "B", text: "Mikrositik anemi" },
      { id: "C", text: "Hemolitik kriz zorunludur" },
      { id: "D", text: "Anemi beklenmez" },
    ],
    correctOptionId: "A",
    explanation:
      "B12 eksikliği megaloblastik/makrositik anemiye yol açabilir.",
    tusNote: "B12 eksikliği → makrositik anemi.",
  },
  {
    id: 39,
    categoryId: 4,
    questionText: "Hiperkalemide EKG'de beklenebilen bulgulardan biri hangisidir?",
    options: [
      { id: "A", text: "Sivri T dalgaları" },
      { id: "B", text: "U dalgası belirginliği" },
      { id: "C", text: "ST elevasyonu şarttır" },
      { id: "D", text: "QT uzaması her zaman olur" },
    ],
    correctOptionId: "A",
    explanation:
      "Hiperkalemi sivri T dalgaları gibi EKG değişikliklerine yol açabilir.",
    tusNote: "Hiperkalemi → sivri T dalgası.",
  },
  {
    id: 40,
    categoryId: 4,
    questionText: "Hiponatremi değerlendirmesinde önemli ilk yaklaşım hangisidir?",
    options: [
      { id: "A", text: "Klinik durum ve serum sodyum düzeyini birlikte değerlendirmek" },
      { id: "B", text: "Her hastaya aynı hızda sodyum vermek" },
      { id: "C", text: "Sadece potasyuma bakmak" },
      { id: "D", text: "Tedaviyi tamamen semptoma bakmadan yapmak" },
    ],
    correctOptionId: "A",
    explanation:
      "Hiponatremide klinik durum, semptom, süre ve sodyum düzeyi birlikte değerlendirilir.",
    tusNote: "Hiponatremi → hızlı düzeltme risklidir.",
  },
];

export function getQuestionsByCategoryId(categoryId: number, count = 10) {
  return demoQuestions
    .filter((question) => question.categoryId === categoryId)
    .slice(0, count);
}