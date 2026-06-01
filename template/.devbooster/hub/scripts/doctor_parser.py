import json
import sys
import os
from collections import defaultdict

def parse_diagnostics(file_path):
    if not os.path.exists(file_path):
        print(f"Relatório não encontrado em {file_path}.")
        return

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Erro ao ler JSON: {e}")
        return

    # O React Doctor pode colocar 'diagnostics' na raiz ou dentro de 'projects'
    diagnostics = data.get('diagnostics', [])
    if not diagnostics and 'projects' in data and len(data['projects']) > 0:
        diagnostics = data['projects'][0].get('diagnostics', [])

    if not diagnostics:
        print("Nenhum erro encontrado no relatório. Árvore limpa!")
        return

    # Categorias consideradas essenciais para o funcionamento/performance
    CRITICAL_CATEGORIES = {"Correctness", "Performance", "Security", "Next.js", "Bundle Size"}
    
    # Regras que são puramente estéticas/opcionais (mesmo que caiam em Architecture)
    COSMETIC_RULES_PREFIXES = ("design-", "no-pure-black-")

    critical_items = defaultdict(list)
    cosmetic_counts = defaultdict(int)

    for diag in diagnostics:
        rule = diag.get('rule', 'unknown')
        category = diag.get('category', 'Unknown')
        severity = diag.get('severity', 'warning')
        
        is_cosmetic = any(rule.startswith(prefix) for prefix in COSMETIC_RULES_PREFIXES)

        # Se for error de verdade ou uma categoria crítica (e não for puramente cosmético)
        if (severity == 'error' or category in CRITICAL_CATEGORIES) and not is_cosmetic:
            filepath = diag.get('filePath', 'unknown file')
            critical_items[filepath].append(diag)
        else:
            # Tudo o resto entra no débito de padronização
            cosmetic_counts[rule] += 1

    # === GERAÇÃO DO RELATÓRIO MOLDADO ===
    
    print("### 🔴 AÇÃO IMEDIATA (Erros Críticos)")
    if not critical_items:
        print("Nenhum erro crítico de performance ou lógica encontrado nas alterações.\n")
    else:
        for filepath, issues in critical_items.items():
            print(f"**{filepath}**")
            for issue in issues:
                line = issue.get('line', '?')
                rule = issue.get('rule', '')
                msg = issue.get('message', '')
                print(f"- `[Linha {line}] {rule}`: {msg}")
            print("")

    print("### 🎨 DÉBITO DE PADRONIZAÇÃO (Cosmético/Opcional)")
    if not cosmetic_counts:
        print("Nenhum débito cosmético pendente.")
    else:
        for rule, count in sorted(cosmetic_counts.items(), key=lambda x: x[1], reverse=True):
            print(f"- `{rule}`: {count} ocorrência(s)")
    
    print("\n*Rodapé: Conteúdo extraído do relatório gerado diagnostics.json*")

if __name__ == "__main__":
    target_file = sys.argv[1] if len(sys.argv) > 1 else "@booster-generated/diagnostics/review.json"
    parse_diagnostics(target_file)
