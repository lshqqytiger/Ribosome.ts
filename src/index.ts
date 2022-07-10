type DNABase = "A" | "C" | "G" | "T";
type RNABase = "A" | "C" | "G" | "U";
type DNA = DNABase[];
type RNA = RNABase[];

type Codon = RNA & { length: 3 };
interface AminoAcid {
  name:
    | "Methionine"
    | "Leucine"
    | "Iso-Leucine"
    | "Phenylalanine"
    | "Valine"
    | "Serine"
    | "Proline"
    | "Threonine"
    | "Alanine"
    | "Tyrosine"
    | "Histidine"
    | "Glutamine"
    | "Asparagine"
    | "Lysine"
    | "Aspartic Acid"
    | "Glutamic Acid"
    | "Cysteine"
    | "Tryptophan"
    | "Arginine"
    | "Glycine"
    | "Stop";
  codon: string;
}

function validateDNA(str: string): boolean {
  return str.split("").every((base) => ["A", "C", "G", "T"].includes(base));
}
function validateRNA(str: string): boolean {
  return str.split("").every((base) => ["A", "C", "G", "U"].includes(base));
}
function stringToDNA(str: string): DNA {
  if (!validateDNA(str)) throw new Error("Invalid DNA");
  return str.split("") as DNA;
}
function stringToRNA(str: string): RNA {
  if (!validateRNA(str)) throw new Error("Invalid RNA");
  return str.split("") as RNA;
}
function codonTable(codon: Codon | string): AminoAcid {
  if (codon instanceof Array) codon = codon.join("");
  let name: AminoAcid["name"] = "Methionine";
  switch (codon) {
    case "UUU":
    case "UUC":
      name = "Phenylalanine";
      break;
    case "UUA":
    case "UUG":
    case "CUU":
    case "CUC":
    case "CUA":
    case "CUG":
      name = "Leucine";
      break;
    case "AUU":
    case "AUC":
    case "AUA":
      name = "Iso-Leucine";
      break;
    case "GUU":
    case "GUC":
    case "GUA":
    case "GUG":
      name = "Valine";
      break;
    case "UCU":
    case "UCC":
    case "UCA":
    case "UCG":
    case "AGU":
    case "AGC":
      name = "Serine";
      break;
    case "CCU":
    case "CCC":
    case "CCA":
    case "CCG":
      name = "Proline";
      break;
    case "ACU":
    case "ACC":
    case "ACA":
    case "ACG":
      name = "Threonine";
      break;
    case "GCU":
    case "GCC":
    case "GCA":
    case "GCG":
      name = "Alanine";
      break;
    case "UAU":
    case "UAC":
      name = "Tyrosine";
      break;
    case "UAA":
    case "UAG":
    case "UGA":
      name = "Stop";
      break;
    case "CAU":
    case "CAC":
      name = "Histidine";
      break;
    case "CAA":
    case "CAG":
      name = "Glutamine";
      break;
    case "AAU":
    case "AAC":
      name = "Asparagine";
      break;
    case "AAA":
    case "AAG":
      name = "Lysine";
      break;
    case "GAU":
    case "GAC":
      name = "Aspartic Acid";
      break;
    case "GAA":
    case "GAG":
      name = "Glutamic Acid";
      break;
    case "UGU":
    case "UGC":
      name = "Cysteine";
      break;
    case "UGG":
      name = "Tryptophan";
      break;
    case "CGU":
    case "CGC":
    case "CGA":
    case "CGG":
      name = "Arginine";
      break;
    case "AGA":
    case "AGG":
      name = "Arginine";
      break;
    case "GGU":
    case "GGC":
    case "GGA":
    case "GGG":
      name = "Glycine";
      break;
  }
  return { name, codon };
}
function cutStop(str: string) {
  for (let i = 0; i < str.length; i = i + 3)
    if (codonTable(str.slice(i, i + 3)).name === "Stop") return str.slice(0, i);
  throw new Error("No stop codon found");
}

export function transcribe(dna: string | DNA) {
  if (typeof dna === "string") dna = stringToDNA(dna);
  return dna.map((x) => {
    switch (x) {
      case "A":
        return "U";
      case "C":
        return "G";
      case "G":
        return "C";
      case "T":
        return "A";
    }
  }) as RNA;
}
export function translateRNA(rna: RNA | string) {
  if (typeof rna === "string") rna = stringToRNA(rna);
  const str = rna.join("");
  const list: AminoAcid[][] = [];
  for (let i of str.split("AUG").slice(1)) {
    const acids: AminoAcid[] = [codonTable("AUG")];
    i = cutStop(i);
    for (let j = 0; j < i.length; j = j + 3)
      acids.push(codonTable(i.slice(j, j + 3)));
    list.push(acids);
  }
  return list;
}

export { DNABase, RNABase, DNA, RNA, Codon, AminoAcid };
