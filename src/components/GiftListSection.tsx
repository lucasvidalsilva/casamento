import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

interface Gift {
  id: number;
  name: string;
  price: string;
  image?: string;
  searchQuery: string;
  clicks: number;
}

const DEFAULT_IMAGE = 'https://via.placeholder.com/300x300?text=Imagem+do+Produto';

const giftItems: Omit<Gift, 'id' | 'clicks' | 'price'>[] = [
  { name: 'Liquidificador', searchQuery: 'liquidificador', image: 'https://m.media-amazon.com/images/I/519XF3-7OoL._AC_SX679_.jpg' },
  { name: 'Ferro de Passar', searchQuery: 'ferro de passar roupa', image: 'https://m.media-amazon.com/images/I/71706ggJMeL.__AC_SY300_SX300_QL70_ML2_.jpg' },
  { name: 'Air Fryer', searchQuery: 'air fryer elétrica 5L', image: 'https://m.media-amazon.com/images/I/51NKkmrtVEL._AC_SX679_.jpg' },
  { name: 'Varal Dobrável', searchQuery: 'varal dobrável inox', image: 'https://m.media-amazon.com/images/I/51ucwKgEA4L.__AC_SX300_SY300_QL70_ML2_.jpg' },
  { name: 'Sanduicheira', searchQuery: 'sanduicheira elétrica antiaderente', image: 'https://m.media-amazon.com/images/I/61wMBjlcDbL.__AC_SX300_SY300_QL70_ML2_.jpg' },
  { name: 'Geladeira', searchQuery: 'geladeira frost free', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRASQzmq4IfHr3H26BkzqS7mLQayb7LXzTHFvRsdR4XS3Q8nCKXmrkkegHNEF1jctJQtXzVrTn9x7ty2l-KX_xfuOsWxtRtj5Of6YP3zbF2MjUiywFAk8LL' },
  { name: 'Máquina de Lavar', searchQuery: 'máquina de lavar 12kg', image: 'https://m.media-amazon.com/images/I/41pS08Q7EoL.__AC_SX300_SY300_QL70_ML2_.jpg' },
  { name: 'Mesa com Cadeira', searchQuery: 'mesa com 4 cadeiras', image: 'https://http2.mlstatic.com/D_NQ_NP_2X_811656-MLA79748605813_102024-F.webp' },
  { name: 'Criado Mudo', searchQuery: 'criado mudo branco casal', image: 'https://m.media-amazon.com/images/I/51BdFXHLcxL.__AC_SY300_SX300_QL70_ML2_.jpg' },
  { name: 'TV', searchQuery: 'smart tv 43 polegadas', image: 'https://m.media-amazon.com/images/I/51lElwjJUeL.__AC_SX300_SY300_QL70_ML2_.jpg' },
  { name: 'Ventilador', searchQuery: 'ventilador turbo 6 pás', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTUdftAMCaDEO8WKNC_2l3Ah9c2kz-KeAg_ZZ4hGJjgxdriNRkxiFfxHoID23-gRtQkOA1rXDh1xV7bkT26n1D_QxP25szTxSjSp2e97HLZFEL-6Xmss7bJEGoYqFHk6q8b_EzF6Rdj7hk&usqp=CAc' },
  { name: 'Jogo de Toalhas', searchQuery: 'jogo de toalhas felpudas', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRRTX0JsvEcU1xmm-foJLEKnufaDGfCbf2ZQCL5H9nVnBHn1Q2kL5VpmuNeEEaqEV2aLyNssd2mU_h2fiG07rprMeVEdixzuTlDhRGInS6Ehe1XK4GmUIx0jCh9PYr57rBhye5Uhq8GMQ&usqp=CAc' },
  { name: 'Roupa de Cama', searchQuery: 'jogo de cama casal 200 fios', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR_XgzEWoG125YoNzLv-sOdtcd2uFoqzji9wxjP61RrSgYNBNF-pduwZ2qH4xWZHivdjAAs9qGbEdvo-3ykW1OwEA042-XyAxo2KDyX5Ito&usqp=CAc' },
  { name: 'Travesseiros', searchQuery: 'travesseiro nasa casal', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTJVRGtId3Nrtl16H45HrnmmA8ghgakcc5RQoiZbdLQj4yU2OWIpKLfOfy03V2J_XDoDHYOiOzrSZTqePipVGrWQl-e8Cnu5z2lC3ye3CKFCm085m3eWuyLpet9B9OsdnU2ZsGXYytC30w&usqp=CAc' },
  { name: 'Jogo de Pratos', searchQuery: 'jogo de pratos porcelana', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQhAHuFHcRbGIoorbG2TMOCS_CPgKbrSk18SHsa_8opgR2nRd_hFORLmLRL4rMFU5j2991gE7rDYSNC4kNBF_n6v3Kvtlx-ZeH-4b_KvxRqqx2SJrI9N6qsWkM4Aa4CNW-NIqDcIZpjA_U&usqp=CAc' },
  { name: 'Jogo de Talheres', searchQuery: 'jogo de talheres inox 24 peças', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQZMfJDe1BeSRG1nVGtlG3YtPz3OkPjCOhBziODg94tr9ei3jC1mdtaVqsZ7F1v26iFJxL7gcwEDqXGQCDhJAZk75ff8UURNMc7vBjZxdTFjPFIryJxV-DvrIyJpDbYXo-IxyGn6zw&usqp=CAc' },
  { name: 'Jogo de Copos', searchQuery: 'jogo de copos vidro 6 peças', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRPELv2g-l9uBjiEahm5CppL2ytiKztNDl0wfcz2Sr0I2nH1yMFRrBoUXdM2EgQZaxppx_CHev21-Fewd0-WUkjnw6CpiccSZ_03B-U7NooLiuwRE7Wig9kheOG0FsML7RCLe4sXw&usqp=CAc' },
  { name: 'Jogo de Xícaras', searchQuery: 'jogo de xícaras porcelana', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTOHjSHFgBy7MLmAuFXNv2wfGF_eC_2ooNWTvzAoVOfGSNlYntLb_mTH6-UeELnR6sJNJc0Qw63tp3JtI1TRh_xrKG3Uejmu2KXpJ7CQqcROaYyMqQumgjzotF1iw_5RO2CwV5pCNFxCA&usqp=CAc' },
  { name: 'Tábua de Corte (com um 1kg de picanha)', searchQuery: 'tábua de corte bambu', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSTI_ws62LSQlozluv_7EsObTIJBgUHF0Yo7IrK9Hqo0Q82gwLQSTcKs4u23SyoqEV-5_RM-qVenHGiZg-W8c4RviCZ1_CQ_DA0S4L-CdXv&usqp=CAc' },
  { name: 'Jogo de Panela', searchQuery: 'conjunto panelas antiaderente', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR4mjTFfqaMVZ54gEMlbTwnxPLss1IxxL6DWfvRk8JbI-p3h_8Kxs-KhXA5tZpEJBzOdzFeiHYzcFkyXYCNwjNsOHtN8Xrrhtc1FThA09sabAXSkNXFnMKMhsD2vteFEw&usqp=CAc' },
  { name: 'Potes com Tampa', searchQuery: 'kit potes com tampa', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR9a2__qjf4nAEC645u5ECztZzWlcEBiv-77eAg0eO_w_v17WLQI3DYpgSfk5jjGSh1rk5OhkbqSoqG6juELi_ZZVvkETu-4cVtRI6bTOxka7MliuTvJnS2pcleJ-UdmtSCOZ-71GAbjzE&usqp=CAc' },
  { name: 'Porta Temperos', searchQuery: 'porta temperos giratório', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRPOXX_CAdSIb8T0cOqr-BJoK7MIBDLVQX6zMy0Q9a-E99Z8qo4fRhEmw2oaPM0eOpKfKMirXx4hbjlviIFhDN3P5O54hQYO4BnJq1Gmyb1OwFariqXzmH0MpTVJ8jbJUANrYzwlyE&usqp=CAc' },
  { name: 'Chaleira', searchQuery: 'chaleira inox elétrica', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRk1j1jB0zQNWSV896dtat0G1O0NaU7ky8UAe2zcFv2KotrLOLZuA7wtDgIdOqQsatZTe8R_FfqsnKPp1otmz4RCEJlyVUdEuTzA78RcUq8fGYPFxT4D57_XJMYxNBvaSO7nmxBiSI5l8s&usqp=CAc' },
  { name: 'Tapetes', searchQuery: 'tapete decorativo sala quarto', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ7FgCwlpwiKlMcuauMhg6erVxkwTUVAH5M27pQeE8dRwvHE--RptpPhA2mbfgPMjTbsCdIt9AQKWaXrcCQY-PdsBQaUeIRtNQjoMMHVWxa7XXy5Y7LofVxx972_PMA0w&usqp=CAc' },
  { name: 'Cesto para Roupa', searchQuery: 'cesto roupa suja dobrável', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQtIRr0GgVsJL914mUup2Ky1Q5n4_AfWinq47nhrErvIRuaTjTtdhhY2UrTINWvIgANdcWKoTIZH1Ra1M3tXU7zry8rZb53kMdpcQtXJy4Ob1SIO2IqDoK_R_RUdfJi1P8AzhKxBazgdDc&usqp=CAc' },
  { name: 'Kit Bancada Banheiro', searchQuery: 'kit bancada banheiro porcelana', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRk73aCN140ZVd7QkUb-NMOmkMNL8Kzxtnw4ZLmpOCFiplZCvjAu09Dlshix-ENkTVctQR7iPKGEf2yybRgEg-806d5oyAXg9VFtKvtlaks94mt8TWaZ3hs0_GqTaVWHPX-i3ZH68QS-w&usqp=CAc' },
  { name: 'Jogo Americano', searchQuery: 'jogo americano mesa 6 lugares', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTjcq_GD8kebAvUn--oc_Ym-Mov40gLKHVqevUccq8NGRIz-0dUgpIbAO2G5eYbg-9ly3PKCGrdqJn1BNtVX_jVnq0PIpUh_oqvQgdl2qU' },
  { name: 'Cortinas', searchQuery: 'cortina blackout sala', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRlLnA1hMwFd8gWj3Cbs6CbBTX2mJ_Wx5CvCZSZf6uifm5uqWduj27a2TU5t0u7rKeiOHR1rVlI_iO-_WQmEyiGTDiPLzBFn4KnlW9xoNf59kgVdmYI9TcdLw&usqp=CAc' },
  { name: 'Aspirador de Pó', searchQuery: 'aspirador de pó portátil potente', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTP-dR5mVpU0ho3ZV8qKpoPbDu1LphOgKgn-S0gsE9N6xTEqY31O33XBLKokjGcpQ33cC4hsygfmfq-wMgGyxduWujO4Mg_0Aq9LAiqg2NLMuiqiZmNFtz_YKH_8WwLgyWxKBvWWKIZNg&usqp=CAc' },
  { name: 'Jogo de Taças', searchQuery: 'jogo de taças vinho cristal', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSfKrD1NsjdxJYB2fjUAbPsndCk1fBhDWImYnKqBBzY-bUU4eBvzojHL8Ke7k_F_qV9Kxpb1l8uM5tqGcuHTFNiG8lWp-7MfqfX7N3sLZrbFN-XgPk5xpRsolpOwSZ1rQ&usqp=CAc' },
  { name: 'Jogo de Escumadeira', searchQuery: 'jogo de escumadeiraaa', image: 'https://www.bing.com/th?id=OPHS.5HiQelKDk6k5HA474C474&o=5&pid=21.1&w=148&h=216&qlt=100&dpr=1,3&o=2&bw=6&bc=FFFFFF' },
];

const GiftListSection: React.FC = () => {
  const [gifts, setGifts] = useState<Gift[]>(
    giftItems.map((gift, index) => ({
      id: index + 1,
      ...gift,
      clicks: 0,
    }))
  );

  const [showAll, setShowAll] = useState(false);
  const displayedGifts = showAll ? gifts : gifts.slice(0, 3);

  useEffect(() => {
    const savedClicks = localStorage.getItem('giftClicks');
    if (savedClicks) {
      const clickData = JSON.parse(savedClicks);
      setGifts(prev =>
        prev.map(gift => ({
          ...gift,
          clicks: clickData[gift.id] || 0,
        }))
      );
    }
  }, []);

  const handleGiftClick = (id: number, searchQuery: string) => {
    setGifts(prev =>
      prev.map(gift =>
        gift.id === id ? { ...gift, clicks: gift.clicks + 1 } : gift
      )
    );

    setTimeout(() => {
      setGifts(currentGifts => {
        const clickMap = currentGifts.reduce((acc, gift) => {
          acc[gift.id] = gift.clicks;
          return acc;
        }, {} as Record<number, number>);
        localStorage.setItem('giftClicks', JSON.stringify(clickMap));
        return currentGifts;
      });
    }, 0);

    const url = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(
      searchQuery
    )}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-cream to-stone-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-dancing text-center text-sage-dark mb-2">
          Lista de Presentes
        </h2>
        <p className="text-4xl md:text-2xl text-center text-sage-dark mb-12">Obs: as fotos são exemplos</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {displayedGifts.map(gift => (
            <div
              key={gift.id}
              className="bg-white rounded-2xl shadow-lg border border-sage-light/30 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={gift.image || DEFAULT_IMAGE}
                  alt={gift.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-sage-medium mb-2">
                  {gift.name}
                </h3>
                <div className="text-2xl font-bold text-sage-dark mb-4">
                  {gift.price}
                </div>
                <button
                  onClick={() => handleGiftClick(gift.id, gift.searchQuery)}
                  className="w-full bg-sage-dark text-cream py-3 px-6 rounded-lg font-medium hover:bg-sage-medium transition-colors duration-300 flex items-center justify-center gap-2 mb-3"
                >
                  Presentear
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {!showAll && gifts.length > 3 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="bg-sage-medium text-cream py-3 px-8 rounded-lg font-medium hover:bg-sage-dark transition-colors duration-300"
            >
              Ver mais
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default GiftListSection;