import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { text } = await request.json();
    console.log('Received text for analysis:', text);

    const mockResponse = {
      'summary': 'PT. Alat Kantor Nusantara mengajukan proposal penawaran pengadaan Alat Tulis Kantor (ATK) kepada Kementerian Keuangan dengan tujuan mendukung operasional kantor. Perusahaan ini menawarkan berbagai jenis ATK dengan total harga Rp 160,727,500. Proposal ini mencakup detail produk, jumlah, dan harga. PT. Alat Kantor Nusantara juga menjamin kualitas produk selama 6 bulan, menyediakan pengiriman cepat maksimal 3 hari kerja, dan layanan purna jual termasuk dukungan teknis. Alamat kantor pusat berlokasi di Jakarta Pusat dengan kontak yang tersedia untuk komunikasi lebih lanjut.',
      'total_harga': 34400000,
      'total_harga_pasar': 45366666.666666664,
      'deviation': -0.24173401910360026,
      'vendor': 'PT Maju Mundur',
      'item_retrieved': [
        {
          'barang_dokumen': 'Pulpen Gel',
          'harga_dokumen': 6000,
          'barang_database': 'PENSIL FABER CASTELL PAKET UJIAN MANTAP',
          'jumlah': 2000,
          'harga_database': 21000,
          'sumber': 'padiumkm',
          'skor_kemiripan': 0.6479517674
        },
        {
          'barang_dokumen': 'Pulpen Gel',
          'harga_dokumen': 6000,
          'barang_database': 'BALLPOINT GEL PEN JOYKO',
          'jumlah': 2000,
          'harga_database': 3000,
          'sumber': 'padiumkm',
          'skor_kemiripan': 0.6338213626
        },
        {
          'barang_dokumen': 'Pulpen Gel',
          'harga_dokumen': 6000,
          'barang_database': 'PENSIL FABER CASTELL SET STANDAR',
          'jumlah': 2000,
          'harga_database': 17000,
          'sumber': 'padiumkm',
          'skor_kemiripan': 0.6291089877
        },
        {
          'barang_dokumen': 'Pensil Mekanik',
          'harga_dokumen': 6000,
          'barang_database': 'ISI PENSIL MEKANIK JOYKO PL-10 2B 2,0 X 90 MM',
          'jumlah': 1000,
          'harga_database': 4000,
          'sumber': 'padiumkm',
          'skor_kemiripan': 0.7013349883
        },
        {
          'barang_dokumen': 'Pensil Mekanik',
          'harga_dokumen': 6000,
          'barang_database': 'ISI PENSIL MEKANIK JOYKO PL-16 2B 2,0 X 120 MM',
          'jumlah': 1000,
          'harga_database': 5000,
          'sumber': 'padiumkm',
          'skor_kemiripan': 0.7007016799
        },
        {
          'barang_dokumen': 'Pensil Mekanik',
          'harga_dokumen': 6000,
          'barang_database': 'ISI PENSIL MEKANIK JOYKO PL-07 2B 0,7',
          'jumlah': 1000,
          'harga_database': 3500,
          'sumber': 'padiumkm',
          'skor_kemiripan': 0.698848013
        },
        {
          'barang_dokumen': 'Kertas HVS A4 (80gsm)',
          'harga_dokumen': 41000,
          'barang_database': 'KERTAS HVS A4 80 GRAM SIDU',
          'jumlah': 400,
          'harga_database': 35000,
          'sumber': 'padiumkm',
          'skor_kemiripan': 0.6752535369
        },
        {
          'barang_dokumen': 'Kertas HVS A4 (80gsm)',
          'harga_dokumen': 41000,
          'barang_database': 'KERTAS HVS A4 70 GRAM SIDU',
          'jumlah': 400,
          'harga_database': 34000,
          'sumber': 'padiumkm',
          'skor_kemiripan': 0.6737205935
        },
        {
          'barang_dokumen': 'Kertas HVS A4 (80gsm)',
          'harga_dokumen': 41000,
          'barang_database': 'KERTAS HVS F4 E-PAPER 70 GRAM',
          'jumlah': 400,
          'harga_database': 35000,
          'sumber': 'padiumkm',
          'skor_kemiripan': 0.6696922005
        }
      ],
      'item_anomaly': [
        {
          'barang_dokumen': 'Kertas HVS A4 (80gsm)',
          'harga_dokumen': 41000,
          'rerata_harga_database': 34666.6666666667,
          'standar_deviasi_harga_database': 577.3502691896,
          'jumlah_barang': 400,
          'perbedaan_harga': 6333.3333333333,
          'persen_perbedaan_harga': 0.1826923077,
          'hasil_checking_ai': 'Sedikit Mencurigakan',
          'total_harga_dokumen': 16400000,
          'total_harga_pasar': 13866666.666666666
        },
        {
          'barang_dokumen': 'Pensil Mekanik',
          'harga_dokumen': 6000,
          'rerata_harga_database': 4166.6666666667,
          'standar_deviasi_harga_database': 763.762615826,
          'jumlah_barang': 1000,
          'perbedaan_harga': 1833.3333333333,
          'persen_perbedaan_harga': 0.44,
          'hasil_checking_ai': 'Sangat Mencurigakan',
          'total_harga_dokumen': 6000000,
          'total_harga_pasar': 4166666.666666667
        },
        {
          'barang_dokumen': 'Pulpen Gel',
          'harga_dokumen': 6000,
          'rerata_harga_database': 13666.6666666667,
          'standar_deviasi_harga_database': 9451.6312525052,
          'jumlah_barang': 2000,
          'perbedaan_harga': -7666.6666666667,
          'persen_perbedaan_harga': -0.5609756098,
          'hasil_checking_ai': 'Tidak Mencurigakan',
          'total_harga_dokumen': 12000000,
          'total_harga_pasar': 27333333.333333332
        }
      ]
    };

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 