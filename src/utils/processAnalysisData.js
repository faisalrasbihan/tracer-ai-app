/**
 * Determines risk level based on deviation percentage
 * @param {number} deviationPercentage - Deviation value in percentage
 * @returns {string} Risk level (Low, Medium, or High)
 */
const getRiskLevel = (deviationPercentage) => {
  if (deviationPercentage > 25) return "High";
  if (deviationPercentage >= 15) return "Medium";
  return "Low";
};

/**
 * Processes API response into format needed for UI tables
 * @param {Object} response - Raw API response
 * @param {number} currentDocumentCount - Current number of documents (for naming)
 * @returns {Object} Processed data for both tables
 */
export const processAnalysisData = (response, currentDocumentCount = 0) => {
  // Process data for homepage table
  const documentData = {
    id: Math.random().toString(36).substr(2, 9),
    name: `Document_${currentDocumentCount + 1}.pdf`,
    uploadDate: new Date().toLocaleString(),
    status: "Completed",
    vendor: response.vendor,
    amount: Math.round(response.total_harga),
    marketPrice: Math.round(response.total_harga_pasar),
    deviation: Math.round(response.deviation * 100), // Round to whole number
    riskLevel: getRiskLevel(response.deviation * 100)
  };

  // Process data for analysis view table
  const itemsData = response.item_anomaly.map(item => ({
    id: Math.random().toString(36).substr(2, 9),
    name: item.barang_dokumen,
    quantity: item.jumlah_barang,
    unitPrice: Math.round(item.harga_dokumen),
    totalPrice: Math.round(item.total_harga_dokumen),
    marketPrice: Math.round(item.total_harga_pasar),
    deviation: Math.round(item.persen_perbedaan_harga * 100), // Round to whole number
    similarItemLink: '#' // Placeholder for similar item link
  }));

  return {
    documentData,
    itemsData
  };
}; 